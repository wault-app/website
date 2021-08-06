import RSA from "../encryption/RSA";
import post from "./fetch/post";
import platform from "platform";
import Device from "./Device";
import { UserType } from "./User";

export default class Authentication {
    public static async start() {
        type ResponseType = {
            id: string;
            secret: string;
        };

        const keys = await RSA.generate();

        const { id, secret } = await post<ResponseType>("/auth/remote/start", {
            body: JSON.stringify({
                rsaKey: keys.publicKey,
                deviceName: this.browserName,
                deviceType: "BROWSER",
            }),
        });

        const QRCode = (await import("qrcode")).default;

        return {
            id,
            secret,
            image: await QRCode.toDataURL(id, { version: 2 }),
            rsa: keys.publicKey,
        };
    }

    public static async check(id: string, secret: string) {
        type ResponseType = {
            message: "remote_auth_not_scanned";
        } | {
            message: "remote_auth_scanned";
            user: UserType;
        } | {
            message: "remote_auth_success";
            user: UserType;
        };
        
        return await post<ResponseType>("/auth/remote/check", {
            body: JSON.stringify({
                id,
                secret,
                web: true,
            }),
        });
    }

    public static async logout() {
        const { device } = await Device.get();

        return await Device.logout(device);
    }

    public static get browserName() {
        return `${platform.name} ${platform.version} (${platform.os})`;
    }
}