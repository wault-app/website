import WrapperError from "@lib/server/error";
import prisma from "@lib/server/prisma";
import wrapper from "@lib/server/wrapper";
import { string, z } from "zod";
import bcrypt from "bcryptjs";
import AccessToken from "@lib/server/auth/AccessToken";
import RefreshToken from "@lib/server/auth/RefreshToken";
import { serialize } from "cookie";
import Cookies from "@lib/server/auth/Cookies";

type AuthenticationCodeCheckResponseType = {
    message: "not_scanned_yet",
} | {
    message: "scanned_but_not_verified",
    data: {
        user: {
            name: string;
        };
    };
} | {
    message: "scanned_and_verified",
    data: {
        exchanges: ({
            vaultid: string;
            content: string;
        })[];
    };
};

export default wrapper<AuthenticationCodeCheckResponseType>(async (req, res) => {
    const schema = z.object({
        id: z.string(),
        secret: z.string(),
        web: z.boolean(),
    });

    const { id, secret, web } = schema.parse(JSON.parse(req.body));
    const auth = await find(id, secret);

    if(!auth.user) {
        return {
            message: "not_scanned_yet",
        };
    }

    if(!auth.device) {
        return {
            message: "scanned_but_not_verified",
            data: {
                user: {
                    name: auth.user.name,
                },
            },
        };
    }

    const exchanges = await prisma.keyExchange.findMany({
        where: {
            deviceid: auth.device.id,
        },
        select: {
            vaultid: true,
            content: true,
        }
    });

    const [accessToken, { refreshToken }] = await Promise.all([
        AccessToken.generate(auth.user),
        RefreshToken.create([auth.deviceName, auth.rsa, auth.user]),
    ])

    if(web) {
        for(const cookie of Cookies.serialize(accessToken, refreshToken)) {
            res.setHeader("Set-Cookie", cookie);
        }
    
        return {
            message: "scanned_and_verified",
            data: {
                exchanges: exchanges.map((exchange) => ({
                    vaultid: exchange.vaultid,
                    content: exchange.content,
                })),
            },
        };
    } else {
        return {
            message: "scanned_and_verified",
            data: {
                accessToken,
                refreshToken,
                exchanges: exchanges.map((exchange) => ({
                    vaultid: exchange.vaultid,
                    content: exchange.content,
                })),
            },
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

    if(!auth) throw new WrapperError("authentication_code_expired");
    if(!(await bcrypt.compare(secret, auth.secret))) throw new WrapperError("invalid_secret");

    return auth;
};