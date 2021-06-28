import get from "./fetch/get";

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
}