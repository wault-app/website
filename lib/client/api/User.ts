import WrapperError from "@lib/server/error";
import get from "./fetch/get";

export type UserType = {
    id: string,
    username: string,
};

export default class User {
    public static async get() {
        try {
            return await get<UserType>("/user/get");
        } catch(e) {
            if(e instanceof WrapperError && e.message === "not_logged_in") return null;
            else throw e; 
        }
    }
}