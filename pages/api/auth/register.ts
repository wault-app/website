import AccessToken from "@lib/server/auth/AccessToken";
import RefreshToken from "@lib/server/auth/RefreshToken";
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
        deviceName: z.string(),
        rsaKey: z.string(),
    });

    const { name, rsaKey, deviceName } = parameters.parse(JSON.parse(req.body));

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

    const [accessToken, refreshToken] = await Promise.all([
        AccessToken.generate(user),
        RefreshToken.create([deviceName, rsaKey, user]),
    ])

    return {
        message: "successful_registration",
        data: {
            accessToken,
            refreshToken,
        },
    };
});