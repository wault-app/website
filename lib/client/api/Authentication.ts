import { z } from "zod";
import RSA from "../encryption/RSA";
import post from "./fetch/post";

export default class Authentication {
    public static async start() {
        const keys = await RSA.generate();

        const secret = ((length: number) => {
            let resp = "";
            const pool = "0123456789abcdef";
        
            for(let i = 0; i < length; i++) {
                resp += pool[Math.random() * pool.length];
            }

            return resp;
        })(128);

        const resp = await post<{ id: string }>("/auth/qr/start", {
            body: JSON.stringify({
                deviceName: this.browserName,
                rsa: keys.publicKey,
                secret,
                type: "BROWSER",
            }),
        });

        const QRCode = (await import("qrcode")).default;

        return {
            id: resp.id,
            image: await QRCode.toDataURL(resp.id, { version: 2 }),
            secret,
            rsa: keys.publicKey,
        };
    }

    public static async check(id: string, secret: string) {
        const resp = await post("/auth/qr/check", {
            body: JSON.stringify({
                id,
                secret,
                web: true,
            }),
        });

        const schema = z.object({
            message: z.literal("not_scanned_yet"),
        }).or(z.object({
            message: z.literal("scanned_but_not_verified"),
            user: z.object({
                username: z.string(),
            }),
        })).or(z.object({
            message: z.literal("scanned_and_verified"),
        }));

        return schema.parse(resp);
    }

    public static async logout() {
        type ResponseType = {
            message: "successfully_logged_out";
        };

        return await post<ResponseType>("/auth/logout");
    }

    private static get browserName() {
        // TODO
        return "Browser";
    }
}