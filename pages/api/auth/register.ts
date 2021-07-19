import EncryptionKey from "@lib/client/encryption/EncryptionKey";
import AccessToken from "@lib/server/auth/AccessToken";
import RefreshToken from "@lib/server/auth/RefreshToken";
import WrapperError from "@lib/server/error";
import prisma from "@lib/server/prisma";
import wrapper from "@lib/server/wrapper";
import { z } from "zod";
import bcrypt from "bcryptjs";
import SendGrid from "@lib/server/SendGrid";

export type RegistrationMessageType = "successful_registration";

export default wrapper(async (req) => {
    // Create a type checking schema
    const parameters = z.object({
        username: z.string(),
        email: z.string(),
        deviceName: z.string(),
        rsaKey: z.string(),
    });

    // Parse the given request body
    const { username, email, rsaKey, deviceName } = parameters.parse(JSON.parse(req.body));

    // Generate a secret value functioning as a one time password
    const secret = await EncryptionKey.generate();

    // Create a registration object in the database for later check
    const registration = await prisma.registration.create({
        data: {
            username,
            email,
            rsaKey,
            deviceName,
            secret: await bcrypt.hash(secret, 10),
        },
    });

    // Send the email to the given address,
    await SendGrid.send({
        from: "Wault <noreply@wault.app>",
        to: email,
        subject: "Registration confirmation",
        text: "Please verify, that you want to register for Wault.",
        html: `<a href="wault-auth://?id=${registration.id}&secret=${secret}">Verify</a>`,
    });

    return {
        message: "registration_email_sent",
    };
});