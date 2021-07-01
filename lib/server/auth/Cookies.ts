import { CookieSerializeOptions, serialize } from "cookie";
import config from "../config";

const options: CookieSerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only enable secure in production, as localhost can't have https
    sameSite: "strict",
    path: "/",
    expires: new Date("2038-01-19"), // max value without integer overflow
};

export default class Cookies {
    public static serialize(accessToken: string, refreshToken: string) {
        return [
            serialize(config.cookies.auth.accessToken, accessToken, options),
            serialize(config.cookies.auth.refreshToken, refreshToken, options),
        ];
    }

    public static remove() {
        return [
            serialize(config.cookies.auth.accessToken, "{deleted}", {
                ...options,
                expires: new Date(0),
            }),
            serialize(config.cookies.auth.refreshToken, "{deleted}", {
                ...options,
                expires: new Date(0),
            }),
        ];
    }
}