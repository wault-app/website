import { NextApiRequest } from "next";
import AccessToken from "./AccessToken";

export default class User {
    public static async get(req: NextApiRequest) {
        const { id, username, deviceid } = await AccessToken.validate(AccessToken.extract(req));

        return {
            id,
            username,
            deviceid,
        };
    }
}