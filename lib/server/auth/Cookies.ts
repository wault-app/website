import { CookieSerializeOptions, serialize } from "cookie";
import config from "../config";

export default class Cookies {
    public static serialize(accessToken: string, refreshToken: string) {
        const options: CookieSerializeOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // only enable secure in production, as localhost can't have https
            sameSite: "strict",
        };

        return [
            serialize(config.cookies.auth.accessToken, accessToken, options),
            serialize(config.cookies.auth.refreshToken, refreshToken, options),
        ];
    }
}