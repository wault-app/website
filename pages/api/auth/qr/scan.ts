import { Authentication, User as PrismaUser } from ".prisma/client";
import WrapperError from "@lib/server/error";
import prisma from "@lib/server/prisma";
import User from "@lib/server/auth/User";
import wrapper from "@lib/server/wrapper";
import { z } from "zod";

export type AuthenticationScannedResponseType = {
    message: "successfully_scanned_authentication_code";
    rsa: string;
};

export default wrapper<AuthenticationScannedResponseType>(async (req) => {
    const schema = z.object({
        id: z.string(),
    });

    const { id } = schema.parse(JSON.parse(req.body));
    const auth = await find(id);
    const user = await User.get(req);
    
    await setUser(auth, user);

    return {
        message: "successfully_scanned_authentication_code",
        rsa: auth.rsa,
    };
});

const setUser = async (auth: Authentication, user: PrismaUser) => {
    return await prisma.authentication.update({
        where: {
            id: auth.id,
        },
        data: {
            user: {
                connect: {
                    id: user.id,
                },
            },
        },
    });
};

const find = async (id: string) => {
    const resp = await prisma.authentication.findUnique({
        where: {
            id,
        },
    });

    if(!resp) throw new WrapperError("authentication_code_expired");

    return resp;
};