import crypto from "crypto";
import prisma from "../prisma";
import bcrypt from "bcryptjs";
import { NextApiRequest } from "next";
import { z } from "zod";
import WrapperError from "../error";
import { User } from ".prisma/client";
import AccessToken from "./AccessToken";

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
            refreshToken: secret,
            device,
        };
    }

    private static async extract(req: NextApiRequest) {
        const refreshToken = {
            ...(req?.cookies || {}),
            ...(JSON.parse(req.body) || {}),
        }["refresh_token"];
        
        const { deviceid } = await AccessToken.unsafeCheck(AccessToken.extract(req));

        const schema = z.object({
            deviceid: z.string().min(1),
            refreshToken: z.string().min(1),
        });

        return schema.parse({
            refreshToken,
            deviceid,
        });
    }

    public static async refresh(req: NextApiRequest) {
        const { deviceid, refreshToken } = await this.extract(req);

        const user = await this.validate(deviceid, refreshToken);

        const { secret, hash } = await this.generate();

        console.log(secret);
        console.log(hash);

        const device = await prisma.device.update({
            where: {
                id: deviceid,
            },
            data: {
                refreshToken: hash,
            },
        });

        return {
            refreshToken: secret,
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

        console.log(refreshToken);
        console.log(device.refreshToken);
        const result = await bcrypt.compare(refreshToken, device.refreshToken);

        if(!result) throw new WrapperError("invalid_refresh_token");

        return device.user;
    }
}