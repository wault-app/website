import get from "./fetch/get";
import post from "./fetch/post";
import { DeviceType as DeviceVariants } from "@prisma/client";

export type DeviceType = {
    id: string;
    name: string;
    loggedInAt: Date;
    rsaKey: string;
    type: DeviceVariants;
};

export default class Device {
    public static async getAll() {
        type ResponseType = {
            devices: DeviceType[];
        };

        return await get<ResponseType>("/device/getAll");
    }

    public static async logout(device: DeviceType) {
        type ResponseType = {
            message: "successful_remote_logout";
        };

        return await post<ResponseType>("/device/logout", {
            body: JSON.stringify({
                deviceid: device.id,
            }),
        });
        
    }
}