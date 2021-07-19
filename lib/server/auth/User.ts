import { NextApiRequest } from "next";
import AccessToken from "./AccessToken";

export default class User {
    public static async get(req: NextApiRequest) {
        const { id, username, email, deviceid } = await AccessToken.validate(AccessToken.extract(req));

        return {
            id,
            username,
            email,
            deviceid,
        };
    }
}