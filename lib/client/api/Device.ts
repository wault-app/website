import get from "./fetch/get";
import post from "./fetch/post";

export type DeviceType = {
    id: string;
    name: string;
    loggedInAt: Date;
    rsaKey: string;
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