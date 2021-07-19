import bcrypt from "bcryptjs";
import prisma from "@lib/server/prisma";
import wrapper from "@lib/server/wrapper";
import { z } from "zod";
import WrapperError from "@lib/server/error";
import RefreshToken from "@lib/server/auth/RefreshToken";
import AccessToken from "@lib/server/auth/AccessToken";

export default wrapper(async (req) => {
    const schema = z.object({
        id: z.string(),
        secret: z.string(),
    });

    const { id, secret } = schema.parse(JSON.parse(req.body));

    const registration = await prisma.registration.findUnique({
        where: {
            id,
        },
    });

    if(!registration || !(await bcrypt.compare(secret, registration.secret))) throw new WrapperError("forbidden");

    const user = await prisma.user.create({
        data: {
            username: registration.username,
            email: registration.email,
        },
    });

    const { refreshToken, device } = await RefreshToken.create(registration.deviceName, registration.rsaKey, user, "MOBILE");
    const accessToken = await AccessToken.generate({
        id: user.id,
        username: user.username,
        deviceid: device.id,
    });

    return {
        message: "successful_registration",
        accessToken,
        refreshToken,
    };
});