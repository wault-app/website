import WrapperError from "@lib/server/error";
import prisma from "@lib/server/prisma";
import wrapper from "@lib/server/wrapper";
import { z } from "zod";
import bcrypt from "bcryptjs";
import AccessToken from "@lib/server/auth/AccessToken";
import RefreshToken from "@lib/server/auth/RefreshToken";
import Cookies from "@lib/server/auth/Cookies";

type AuthenticationCodeCheckResponseType = {
    message: "not_scanned_yet",
} | {
    message: "scanned_but_not_verified",
    user: {
        username: string;
    };
} | {
    message: "scanned_and_verified",
    exchanges: ({
        safeid: string;
        content: string;
    })[];
};

export default wrapper<AuthenticationCodeCheckResponseType>(async (req, res) => {
    const schema = z.object({
        id: z.string(),
        secret: z.string(),
        web: z.boolean(),
    });

    const { id, secret, web } = schema.parse(JSON.parse(req.body));
    const auth = await find(id, secret);

    if (!auth.user) {
        return {
            message: "not_scanned_yet",
        };
    }

    if (!auth.device) {
        return {
            message: "scanned_but_not_verified",        
            user: {
                username: auth.user.username,
            },
        };
    }

    const exchanges = await prisma.keyExchange.findMany({
        where: {
            deviceid: auth.device.id,
        },
        select: {
            safeid: true,
            content: true,
        }
    });

    const { refreshToken, device } = await RefreshToken.create([auth.deviceName, auth.rsa, auth.user]);
    const accessToken = await AccessToken.generate({
        id: auth.user.id,
        username: auth.user.username,
        deviceid: device.id
    });

    if (web) {
        res.setHeader("Set-Cookie", Cookies.serialize(accessToken, refreshToken));

        return {
            message: "scanned_and_verified",
            exchanges: exchanges.map((exchange) => ({
                safeid: exchange.safeid,
                content: exchange.content,
            })),
        };
    } else {
        return {
            message: "scanned_and_verified",
            accessToken,
            refreshToken,
            exchanges: exchanges.map((exchange) => ({
                safeid: exchange.safeid,
                content: exchange.content,
            })),
        };
    }

});

const find = async (id: string, secret: string) => {
    const auth = await prisma.authentication.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
            device: true,
        }
    });

    if (!auth) throw new WrapperError("authentication_code_expired");
    if (!(await bcrypt.compare(secret, auth.secret))) throw new WrapperError("invalid_secret");

    return auth;
};