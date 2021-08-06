import get from "./fetch/get";

export type UserType = {
    id: string;
    username: string;
    email: string;
    icon?: IconType;
};

export type IconType = {
    id: string;
    type: "EMOJI" | "IMAGE";
    value: string;
};

export default class User {
    public static async get() {
        try {
            return await get<UserType>("/user");
        } catch(e) {
            if(e.message === "Unauthorized") return null;
            else throw e; 
        }
    }
}