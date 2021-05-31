import prisma from "@lib/server/prisma";
import wrapper from "@lib/server/wrapper";
import { v4 } from "uuid";
import { z } from "zod";

export type AuthenticationStartResponseType = {
    data: {
        uuid: string;
    };
};

export default wrapper<AuthenticationStartResponseType>(async (req) => {
    /**
     * Checks for parameter mismatch
     */
    const parameters = z.object({
        deviceName: z.string(),
        secret: z.string(),
        rsa: z.string(),
    });

    const { deviceName, secret, rsa } = parameters.parse(JSON.parse(req.body));

    /**
     * Create authentication object
     */
    const authentication = await prisma.authentication.create({
        data: {
            uuid: v4(),
            secret,
            deviceName,
            rsa,
        },
        select: {
            uuid: true,
        },
    });

    return {
        data: {
            uuid: authentication.uuid,
        },
    };
});