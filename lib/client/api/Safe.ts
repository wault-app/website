import post from "./fetch/post";
import get from "./fetch/get";
import EncryptionKey from "../encryption/EncryptionKey";
import PublicRSA from "../encryption/RSA/public";
import AES from "../encryption/AES";
import Device from "./Device";
import KeyExchange from "./KeyExchange";
import { RoleType } from "@prisma/client";

export type SafeType = {
    id: string;
    name: string;
    items: ({
        id: string;
        content: string;
    })[];
};

export type KeycardType = {
    id: string;
    safe: SafeType;
    role: RoleType;
};

export default class Safe {
    public static async getAll(): Promise<KeycardType[]> {
        type ResponseType = {
            keycards: KeycardType[];
        };

        // query the safe data from the server
        const [{ keycards }] = await Promise.all([
            get<ResponseType>("/safe/get"),
            KeyExchange.get(),
        ]);

        return await Promise.all(
            keycards.map(
                async (keycard) => await this.decrypt(keycard),
            )
        );
    }

    public static async decrypt(keycard: KeycardType) {
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
                            content: key.decrypt(item.content),
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
        const { keycard } = await post<{ keycard: KeycardType }>("/safe/create", {
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
                    const rsa = new PublicRSA(device.rsaKey);

                    return await KeyExchange.send(
                        keycard.safe.id,
                        device.id,
                        rsa.encrypt(key)
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