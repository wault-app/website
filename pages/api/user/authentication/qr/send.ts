import WrapperError from "@lib/server/error";
import prisma from "@lib/server/prisma";
import User from "@lib/server/user";
import wrapper from "@lib/server/wrapper";
import { v4 } from "uuid";
import { z } from "zod";

export type AuthenticationSentResponseType = {
    message: "successfully_sent_authentication_data";
};

export default wrapper<AuthenticationSentResponseType>(async (req) => {
    const schema = z.object({
        uuid: z.string(),
        keys: z.array(z.object({
            vaultUUID: z.string(),
            content: z.string(),
        })),
    });

    const { uuid, keys } = schema.parse(JSON.parse(req.body));

    const user = await User.get(req);
    const auth = await find(uuid);

    /**
     * Forbidden if user is not associated with authentication code object
     */
    if (auth.userUuid !== user.uuid) throw new WrapperError("forbidden");

    const device = await prisma.device.create({
        data: {
            uuid: v4(),
            name: auth.deviceName,
            rsaKey: auth.rsa,
            user: {
                connect: {
                    uuid: user.uuid,
                },
            },
        },
    });

    await prisma.authentication.update({
        where: {
            uuid: auth.uuid,
        },
        data: {
            device: {
                connect: {
                    uuid: device.uuid,
                },
            },
        },
    });

    const exchanges = await Promise.all(keys.map(async (key) =>
        await prisma.keyExchange.create({
            data: {
                uuid: v4(),
                content: key.content,
                vault: {
                    connect: {
                        uuid: key.vaultUUID,
                    },
                },
                device: {
                    connect: {
                        uuid: device.uuid,
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
const find = async (uuid: string) => {
    const resp = await prisma.authentication.findUnique({
        where: {
            uuid,
        },
    });

    if (!resp) throw new WrapperError("authentication_code_expired");

    return resp;
};