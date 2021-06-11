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
        name: z.string(),
    });

    const { name } = parameters.parse(JSON.parse(req.body));

    /**
     * Creating user and filtering data to prevent accidental data passing
     */
    const user = await prisma.user.create({
        data: {
            name,
        },
        select: {
            id: true,
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