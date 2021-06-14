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
        username: z.string(),
        deviceName: z.string(),
        rsaKey: z.string(),
    });

    const { username, rsaKey, deviceName } = parameters.parse(JSON.parse(req.body));

    /**
     * Creating user and filtering data to prevent accidental data passing
     */
    const user = await prisma.user.create({
        data: {
            username,
        },
        select: {
            id: true,
            username: true,
        },
    });

    const refreshToken = await RefreshToken.create([deviceName, rsaKey, user]);
    const accessToken = await AccessToken.generate({
        id: user.id,
        username: user.username,
        deviceid: refreshToken.device.id
    });

    return {
        message: "successful_registration",
        accessToken,
        refreshToken,
    };
});