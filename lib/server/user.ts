import { NextApiRequest } from "next";
import { User as PrismaUser } from "@prisma/client";

export default class User {
    public static async get(req: NextApiRequest): Promise<PrismaUser> {
        return {};
    }
}