import get from "./fetch/get";
import post from "./fetch/post";
import { UserType } from "./User";

export type DeviceVariants = "MOBILE" | "WEB" | "DESKTOP" | "CLI";

export type DeviceType = {
    id: string;
    name: string;
    type: DeviceVariants;
    loggedInAt: string;
    rsaKey: string;
};

export default class Device {
    public static async getAll() {
        type ResponseType = {
            devices: DeviceType[];
        };

        return await get<ResponseType>("/device");
    }

    public static async get() {
        type ResponseType = {
            device: DeviceType & {
                user: UserType;
            };
        };

        return await get<ResponseType>("/device/get");
    }

    public static async logout({ id }: DeviceType) {
        type ResponseType = {
            message: "successful_logout";
        };

        return await post<ResponseType>("/device/logout", {
            body: JSON.stringify({
                id,
            }),
        });
        
    }
}