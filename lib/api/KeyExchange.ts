import get from "./fetch/get";
import EncryptionKey from "../encryption/EncryptionKey";
import RSA from "../encryption/RSA";

export type KeyExchangeType = {
    id: string;
    safe: {
        id: string;
    };
    value: string;
};

export default class KeyExchange {
    public static async getAll() {
        type ResponseType = {
            keyExchanges: KeyExchangeType[];
        };

        const { keyExchanges } = await get<ResponseType>("/key-exchange");
    
        const privateKey = await RSA.load();

        for(const key of keyExchanges) {
            EncryptionKey.save(key.safe.id, await RSA.decrypt(key.value, privateKey));
        }
    }
}