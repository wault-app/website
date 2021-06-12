import WrapperError from "@lib/server/error";
import get from "./fetch/get";

export type UserType = {
    id: string,
    name: string,
};

export default class User {
    public static async get() {
        try {
            const { data } = await get<UserType>("/user/get");
    
            return data;
        } catch(e) {
            if(e instanceof WrapperError && e.message === "not_logged_in") return null;
            else throw e; 
        }
    }
}