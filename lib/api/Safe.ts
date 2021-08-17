import post from "./fetch/post";
import get from "./fetch/get";
import EncryptionKey from "../encryption/EncryptionKey";
import AES from "../encryption/AES";
import Device from "./Device";
import KeyExchange from "./KeyExchange";
import RSA from "../encryption/RSA";
import { EncryptedKeycardType, KeycardType } from "@wault/typings";

export default class Safe {
    public static async getAll(): Promise<KeycardType[]> {
        type ResponseType = {
            keycards: EncryptedKeycardType[];
        };

        await KeyExchange.getAll();

        // query the safe data from the server
        const { keycards } = await get<ResponseType>("/safe");

        // decrypt all keycard with their corresponding decryption key
        return await Promise.all(
            keycards.map(
                async (keycard) => await this.decrypt(keycard),
            )
        );
    }

    private static async decrypt(keycard: EncryptedKeycardType): Promise<KeycardType> {
        const key = new AES(await EncryptionKey.get(keycard.safe.id));
        
        return {
            ...keycard,
            safe: {
                ...keycard.safe,
                name: key.decrypt(keycard.safe.name),
                description: key.decrypt(keycard.safe.description),
                keycards: keycard.safe.keycards,
                items: await Promise.all(
                    keycard.safe.items.map(
                        async (item) => ({
                            ...item,
                            ...JSON.parse(key.decrypt(item.data)),
                        })
                    )
                ),
            },
        };
    }

    public static async create(name: string, description?: string) {
        type ResponseType = {
            message: "keycard_create_success";
            keycard: EncryptedKeycardType;
        };

        // generate encryption key
        const key = await EncryptionKey.generate();

        // encrypt the safe name
        const encryptor = new AES(key);
        const encryptedName = encryptor.encrypt(name);

        const encryptedDescription = description ? encryptor.encrypt(description) : undefined;

        // query all of our devices
        const { devices } = await Device.getAll();

        // create the safe on the server
        const { keycard, message } = await post<ResponseType>("/safe", {
            body: JSON.stringify({
                name: encryptedName,
                encryptedDescription,
                keyExchanges: await Promise.all(
                    devices.map(
                        async (device) => {
                            const value = await RSA.encrypt(key, device.rsaKey);
                            
                            return {
                                deviceid: device.id,
                                value,
                            };
                        }
                    )
                )
            })
        });

        // save the encryption key to local storage
        await EncryptionKey.save(keycard.safe.id, key);

        // decrypt the remote data
        const decrypted = await this.decrypt(keycard);

        // send back the new keycard object to be stored in a context
        return {
            message,
            keycard: decrypted,
        };
    }
}