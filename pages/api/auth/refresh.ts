import RefreshToken from "@lib/server/auth/RefreshToken";
import wrapper from "@lib/server/wrapper";
import { z } from "zod";
import { serialize } from 'cookie';
import config from "@lib/server/config";
import AccessToken from "@lib/server/auth/AccessToken";

export default wrapper(async (req, res) => {
    const schema = z.object({
        web: z.boolean(),
    });

    const { refreshToken, user } = await RefreshToken.refresh(req);
    const accessToken = await AccessToken.generate(user);
    const { web } = schema.parse(JSON.parse(req.body));

    if(web) {
        res.setHeader("Set-Cookie", serialize(config.cookies.auth.accessToken, accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // only enable secure in production, as localhost can't have https
            sameSite: "strict",
        }));

        res.setHeader("Set-Cookie", serialize(config.cookies.auth.refreshToken, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // only enable secure in production, as localhost can't have https
            sameSite: "strict",
        }));
        
        return {
            message: "successful_refresh_token",
        };
    } else {
        return {
            message: "successful_refresh_token",
            data: {
                refreshToken,
                accessToken,
            },
        };
    }
});