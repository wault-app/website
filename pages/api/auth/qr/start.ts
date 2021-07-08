import prisma from "@lib/server/prisma";
import wrapper from "@lib/server/wrapper";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { DeviceType } from "@prisma/client";

export type AuthenticationStartResponseType = {
    id: string;
};

export default wrapper<AuthenticationStartResponseType>(async (req) => {
    /**
     * Checks for parameter mismatch
     */
    const parameters = z.object({
        deviceName: z.string(),
        secret: z.string(),
        rsa: z.string(),
        type: z.enum(["BROWSER", "DESKTOP"]),
    });

    const { deviceName, secret, rsa, type } = parameters.parse(JSON.parse(req.body));

    /**
     * Create authentication object
     */
    const authentication = await prisma.authentication.create({
        data: {
            secret: await bcrypt.hash(secret, 10),
            deviceName,
            rsa,
            type,
        },
        select: {
            id: true,
        },
    });

    return {
        id: authentication.id,
    };
});