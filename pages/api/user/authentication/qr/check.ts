import WrapperError from "@lib/server/error";
import prisma from "@lib/server/prisma";
import wrapper from "@lib/server/wrapper";
import { string, z } from "zod";
import bcrypt from "bcryptjs";

type AuthenticationCodeCheckResponseType = {
    message: "not_scanned_yet",
} | {
    message: "scanned_but_not_verified",
    data: {
        user: {
            name: string;
        };
    };
} | {
    message: "scanned_and_verified",
    data: {
        exchanges: ({
            vaultUUID: string;
            content: string;
        })[];
    };
};

export default wrapper<AuthenticationCodeCheckResponseType>(async (req) => {
    const schema = z.object({
        uuid: z.string(),
        secret: z.string(),
    });

    const { uuid, secret } = schema.parse(JSON.parse(req.body));
    const auth = await find(uuid, secret);

    if(!auth.user) {
        return {
            message: "not_scanned_yet",
        };
    }

    if(!auth.device) {
        return {
            message: "scanned_but_not_verified",
            data: {
                user: {
                    name: auth.user.name,
                },
            },
        };
    }

    const exchanges = await prisma.keyExchange.findMany({
        where: {
            deviceUuid: auth.device.uuid,
        },
        select: {
            vaultUuid: true,
            content: true,
        }
    });

    return {
        message: "scanned_and_verified",
        data: {
            exchanges: exchanges.map((exchange) => ({
                vaultUUID: exchange.vaultUuid,
                content: exchange.content,
            })),
        },
    };
});

const find = async (uuid: string, secret: string) => {
    const auth = await prisma.authentication.findUnique({
        where: {
            uuid,
        },
        include: {
            user: true,
            device: true,
        }
    });

    if(!auth) throw new WrapperError("authentication_code_expired");
    if(!(await bcrypt.compare(secret, auth.secret))) throw new WrapperError("invalid_secret");

    return auth;
};