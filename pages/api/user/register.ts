import WrapperError from "@lib/server/error";
import prisma from "@lib/server/prisma";
import wrapper from "@lib/server/wrapper";
import { z } from "zod";

export type RegistrationMessageType = "successful_registration"; 

export default wrapper(async (req) => {
    /**
     * Checking given parameters for any type mismatch
     */
    const parameters = z.object({
        uuid: z.string(),
        name: z.string(),
    });

    const { uuid, name } = parameters.parse(JSON.parse(req.body));

    /**
     * Checks if UUID is free or already in use
     */
    await checkUUID(uuid);

    /**
     * Creating user and filtering data to prevent accidental data passing
     */
    const user = await prisma.user.create({
        data: {
            uuid,
            name,
        },
        select: {
            uuid: true,
            name: true,
        },
    });

    return {
        message: "successful_registration",
        data: {
            user,
        },
    };
});

const checkUUID = async (uuid: string) => {
    const data = await prisma.user.findUnique({
        where: {
            uuid,
        },
    });

    if(data) throw new WrapperError("uuid_already_used");
};