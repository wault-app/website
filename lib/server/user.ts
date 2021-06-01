import { NextApiRequest } from "next";
import { User as PrismaUser } from "@prisma/client";
import JsonWebToken from "jsonwebtoken";
import config from "./config";
import WrapperError from "./error";
import prisma from "./prisma";

export default class User {
    public static async get(req: NextApiRequest): Promise<PrismaUser> {
        const accessToken = req.cookies["access_token"] || req.headers?.authorization?.replaceAll("Bearer ", "");
        if(!accessToken) throw new WrapperError("not_logged_in");

        const token = JsonWebToken.verify(accessToken, config.secrets.jwt.privateKey);
        if(typeof token === "string") throw new WrapperError("unexcepted_error");

        // @ts-ignore
        const uuid = token.uuid;

        const user = await prisma.user.findUnique({
            where: {
                uuid,
            },
        });

        return user;
    }
}