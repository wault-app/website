import RSA from "../encryption/RSA";
import post from "./fetch/post";
import platform from "platform";
import Device from "./Device";
import AES from "../encryption/AES";
import PBKDF2 from "@lib/encryption/PBKDF2";

export default class Authentication {
    public static async register(username: string, email: string, password: string) {
        type ResponseType = {
            message: string;
        };

        const { publicKey, privateKey } = await RSA.generate();

        const resp = await post<ResponseType>("/auth/register", {
            body: JSON.stringify({
                username,
                email,
                password: this.hashPassword(password, email),
                deviceName: this.browserName,
                deviceType: "BROWSER",
                rsa: {
                    publicKey,
                    privateKey: await AES.encrypt(privateKey, password),
                },
            }),
        });

        return {
            ...resp,
            publicKey,
            privateKey,
        };
    }

    public static async login(email: string, password: string) {
        type ResponseType = {
            message: string;
            publicKey: string;
            privateKey: string;
        };

        const { publicKey, privateKey, message } = await post<ResponseType>("/auth/login", {
            body: JSON.stringify({
                email,
                password: this.hashPassword(password, email),
                deviceName: this.browserName,
                deviceType: "BROWSER",
            }),
        });
        
        return {
            message,
            publicKey,
            privateKey: await AES.decrypt(privateKey, password),
        };
    }

    public static async refreshToken() {
        return await post<ResponseType>("/auth/refresh_token");
    }

    public static async verifyEmail(id: string, secret: string) {
        type ResponseType = {
            message: string;
            publicKey: string;
            privateKey: string;
        };

        return await post<ResponseType>("/auth/register/verify", {
            body: JSON.stringify({
                id,
                secret,
            }),
        });
    }

    public static async checkPassword(email: string, password: string) {
        type ResponseType = {
            message: string;
            publicKey: string;
            privateKey: string;
        };

        const { message, publicKey, privateKey } = await post<ResponseType>("/auth/checkPassword", {
            body: JSON.stringify({
                email,
                password: this.hashPassword(password, email),
            }),
        }); 

        return {
            message,
            publicKey,
            privateKey: await AES.decrypt(privateKey, password),
        };
    }

    private static hashPassword(password: string, salt?: string) {
        // hashing must produce the same output every time, so the salt MUST be the same for both registration and authentication
        return PBKDF2.hash(password, salt || "wault", 512, 1);
    }

    public static async logout() {
        const { device } = await Device.get();

        return await Device.logout(device);
    }

    public static get browserName() {
        return `${platform.name} ${platform.version} (${platform.os})`;
    }
}