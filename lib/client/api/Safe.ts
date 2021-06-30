import post from "./fetch/post";
import get from "./fetch/get";
import EncryptionKey from "../encryption/EncryptionKey";
import AES from "../encryption/AES";
import Device from "./Device";
import KeyExchange from "./KeyExchange";
import { RoleType } from "@prisma/client";
import { EncryptedItemType, ItemType } from "./Item";
import RSA from "../encryption/RSA";

export type SafeType = {
    id: string;
    name: string;
    items: ItemType[];
};

export type KeycardType = {
    id: string;
    safe: SafeType;
    role: RoleType;
};

type EncryptedSafeType = {
    id: string;
    name: string;
    items: EncryptedItemType[];
};

type EncryptedKeycardType = {
    id: string;
    safe: EncryptedSafeType;
    role: RoleType;
};

export default class Safe {
    public static async getAll(): Promise<KeycardType[]> {
        type ResponseType = {
            keycards: EncryptedKeycardType[];
        };

        // query the safe data from the server
        const [{ keycards }] = await Promise.all([
            get<ResponseType>("/safe/get"),
            KeyExchange.get(),
        ]);

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

    public static async create(name: string) {
        // generate encryption key
        const key = await EncryptionKey.generate();

        // encrypt the safe name
        const encryptor = new AES(key);
        const encryptedName = encryptor.encrypt(name);

        // create the safe on the server
        const { keycard } = await post<{ keycard: EncryptedKeycardType }>("/safe/create", {
            body: JSON.stringify({
                name: encryptedName,
            })
        });

        // save the encryption key to local storage
        await EncryptionKey.save(keycard.safe.id, key);

        // query all of our devices
        const { devices } = await Device.getAll();

        // send the new encryption key to all device
        await Promise.all(
            devices.map(
                async (device) => {
                    return await KeyExchange.send(
                        keycard.safe.id,
                        device.id,
                        await RSA.encrypt(key, device.rsaKey),
                    );
                } 
            )
        );

        // decrypt the remote data
        const decrypted = await this.decrypt(keycard);

        // send back the new keycard object to be stored in a context
        return decrypted;
    }
}