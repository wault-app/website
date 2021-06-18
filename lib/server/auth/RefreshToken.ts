import crypto from "crypto";
import prisma from "../prisma";
import bcrypt from "bcryptjs";
import { NextApiRequest } from "next";
import { z } from "zod";
import WrapperError from "../error";
import { User } from ".prisma/client";

export default class RefreshToken {
    public static async create([name, rsaKey, user]: [string, string, User]) {
        const { hash, secret } = await this.generate();

        const device = await prisma.device.create({
            data: {
                name,
                rsaKey,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                refreshToken: hash,
            },
        });

        return {
            refreshToken: this.serialize(device.id, secret),
            device,
        };
    }

    private static serialize(deviceid: string, secret: string) {
        return JSON.stringify({
            deviceid,
            refreshToken: secret, 
        });
    }

    private static extract(req: NextApiRequest) {
        const token = (req.cookies || JSON.parse(req.body))["refresh_token"];

        const schema = z.object({
            deviceid: z.string().min(1),
            refreshToken: z.string().min(1),
        });

        return schema.parse(JSON.parse(token));
    }

    public static async refresh(req: NextApiRequest) {
        const { deviceid, refreshToken } = this.extract(req);

        const user = await this.validate(deviceid, refreshToken);

        const { secret, hash } = await this.generate();

        const device = await prisma.device.update({
            where: {
                id: deviceid,
            },
            data: {
                refreshToken: hash,
            },
        });

        return {
            refreshToken: this.serialize(deviceid, secret),
            user,
            device,
        };
    }

    private static async generate(rounds = 10) {
        const secret = await crypto.randomBytes(512).toString("hex");
        const hash = await bcrypt.hash(secret, rounds);

        return {
            secret,
            hash,
        };
    }

    private static async validate(id: string, refreshToken: string) {
        const device = await prisma.device.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            },
        });

        if(!device) throw new WrapperError("device_not_found");

        const result = await bcrypt.compare(refreshToken, device.refreshToken);

        if(!result) throw new WrapperError("invalid_refresh_token");

        return device.user;
    }
}