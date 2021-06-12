import WrapperError from "@lib/server/error";
import prisma from "@lib/server/prisma";
import User from "@lib/server/auth/User";
import wrapper from "@lib/server/wrapper";
import { z } from "zod";
import RefreshToken from "@lib/server/auth/RefreshToken";

export type AuthenticationSentResponseType = {
    message: "successfully_sent_authentication_data";
};

export default wrapper<AuthenticationSentResponseType>(async (req) => {
    const schema = z.object({
        id: z.string(),
        keys: z.array(z.object({
            vaultid: z.string(),
            content: z.string(),
        })),
    });

    const { id, keys } = schema.parse(JSON.parse(req.body));

    const user = await User.get(req);
    const auth = await find(id);

    /**
     * Forbidden if user is not associated with authentication code object
     */
    if (auth.userid !== user.id) throw new WrapperError("forbidden");

    const { device } = await RefreshToken.create([auth.deviceName, auth.rsa, user]);

    await prisma.authentication.update({
        where: {
            id: auth.id,
        },
        data: {
            device: {
                connect: {
                    id: device.id,
                },
            },
        },
    });

    const exchanges = await Promise.all(keys.map(async (key) =>
        await prisma.keyExchange.create({
            data: {
                content: key.content,
                vault: {
                    connect: {
                        id: key.vaultid,
                    },
                },
                device: {
                    connect: {
                        id: device.id,
                    },
                },
            },
        })
    ));

    return {
        message: "successfully_sent_authentication_data",
        data: {
            device,
        },
    };
});

/**
 * Finds an authentication code object by uuid
 * @param uuid 
 * @returns `Authentication` object
 */
const find = async (id: string) => {
    const resp = await prisma.authentication.findUnique({
        where: {
            id,
        },
    });

    if (!resp) throw new WrapperError("authentication_code_expired");

    return resp;
};