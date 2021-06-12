import { NextApiRequest } from "next";
import { User as PrismaUser } from "@prisma/client";
import prisma from "../prisma";
import AccessToken from "./AccessToken";

export default class User {
    public static async get(req: NextApiRequest): Promise<PrismaUser> {
        const { id } = await AccessToken.validate(AccessToken.extract(req));

        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    }
}