import jsonwebtoken from "jsonwebtoken";
import { NextApiRequest } from "next";
import { z } from "zod";
import config from "../config";
import WrapperError from "../error";

export default class AccessToken {
    /**
     * Generates a jsonwebtoken for given user
     * @param user the user who we want to generate jwt for
     * @returns JsonWebToken as a string
     */
    public static async generate(instance: {
        id: string;
        username: string;
        deviceid: string;
    }) {
        return await jsonwebtoken.sign(instance, config.secrets.jwt.privateKey, {
            issuer: "Wault",
            expiresIn: "5m",
        });
    }

    /**
     * Validates a given jsonwebtoken
     * @param jwt a string containing the jwt
     * @returns a typed object of contents
     */
    public static async validate(jwt?: string) {
        if(!jwt) throw new WrapperError("not_logged_in");

        const data = await jsonwebtoken.verify(jwt, config.secrets.jwt.privateKey);
        return this.typeCheck(data);
    }

    public static extract(req: NextApiRequest): string | undefined {
        return req.cookies["access_token"] || (req.headers.authorization || "").replace("Bearer ", "");
    }

    public static async unsafeCheck(jwt?: string) {
        if(!jwt) throw new WrapperError("not_logged_in");
        
        const data = await jsonwebtoken.verify(jwt, config.secrets.jwt.privateKey, {
            ignoreExpiration: true,
        });
        
        return this.typeCheck(data);

    }

    private static typeCheck(data: any) {
        const schema = z.object({
            id: z.string(),
            username: z.string(),
            deviceid: z.string(),
        });

        return schema.parse(data);
    }
}