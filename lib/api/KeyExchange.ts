import get from "./fetch/get";
import EncryptionKey from "../encryption/EncryptionKey";
import RSA from "../encryption/RSA";

export type KeyExchangeType = {
    safeId: string;
    value: string;
};

export default class KeyExchange {
    public static async getAll() {
        type ResponseType = {
            exchanges: KeyExchangeType[];
        };

        const { exchanges } = await get<ResponseType>("/key-exchanges/get");
    
        const privateKey = await RSA.load();

        for(const key of exchanges) {
            EncryptionKey.save(key.safeId, await RSA.decrypt(key.value, privateKey));
        }
    }
}