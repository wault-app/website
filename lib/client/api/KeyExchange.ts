import get from "./fetch/get";
import post from "./fetch/post";
import EncryptionKey from "../encryption/EncryptionKey";
import RSA from "../encryption/RSA";

export type KeyExchangeType = {
    safeid: string;
    content: string;
};

export default class KeyExchange {
    public static async get() {
        type ResponseType = {
            exchanges: KeyExchangeType[];
        };

        const { exchanges } = await get<ResponseType>("/key-exchanges/get");
    
        const privateKey = await RSA.load();

        for(const key of exchanges) {
            EncryptionKey.save(key.safeid, await RSA.decrypt(key.content, privateKey));
        }
    }

    public static async send(safeid: string, deviceid: string, content: string) {
        type ResponseType = {
            message: "successfully_sent_key_exchange";
        };
        
        return await post<ResponseType>("/key-exchanges/send", {
            body: JSON.stringify({
                safeid,
                deviceid,
                content,
            }),
        });
    }
}