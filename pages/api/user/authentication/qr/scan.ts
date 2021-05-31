import { Authentication, User as PrismaUser } from ".prisma/client";
import WrapperError from "@lib/server/error";
import prisma from "@lib/server/prisma";
import User from "@lib/server/user";
import wrapper from "@lib/server/wrapper";
import { z } from "zod";

export type AuthenticationScannedResponseType = {
    message: "successfully_scanned_authentication_code";
    data: {
        rsa: string;
    };
};

export default wrapper<AuthenticationScannedResponseType>(async (req) => {
    const schema = z.object({
        uuid: z.string(),
    });

    const { uuid } = schema.parse(JSON.parse(req.body));
    const auth = await find(uuid);
    const user = await User.get(req);
    
    await setUser(auth, user);

    return {
        message: "successfully_scanned_authentication_code",
        data: {
            rsa: auth.rsa,
        },
    };
});

const setUser = async (auth: Authentication, user: PrismaUser) => {
    return await prisma.authentication.update({
        where: {
            uuid: auth.uuid,
        },
        data: {
            user: {
                connect: {
                    uuid: user.uuid,
                },
            },
        },
    });
};

const find = async (uuid: string) => {
    const resp = await prisma.authentication.findUnique({
        where: {
            uuid,
        },
    });

    if(!resp) throw new WrapperError("authentication_code_expired");

    return resp;
};