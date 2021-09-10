import post from "./fetch/post";
import get from "./fetch/get";
import AES from "../encryption/AES";
import { EncryptedKeycardType, KeycardType } from "@wault/typings";
import RSA from "@lib/encryption/RSA";
import Secret from "@lib/encryption/Secret";

export default class Safe {
    public static async getAll(privateKey: string): Promise<KeycardType[]> {
        type ResponseType = {
            keycards: EncryptedKeycardType[];
        };

        // query the safe data from the server
        const { keycards } = await get<ResponseType>("/safe");

        // decrypt all keycard with their corresponding decryption key
        return await Promise.all(
            keycards.map(
                async (keycard) => await this.decrypt(keycard, privateKey),
            )
        );
    }

    private static async decrypt(keycard: EncryptedKeycardType, privateKey: string): Promise<KeycardType> {
        const key = await RSA.decrypt(keycard.secret, privateKey);

        return {
            ...keycard,
            safe: {
                ...keycard.safe,
                name: await AES.decrypt(keycard.safe.name, key),
                description: await AES.decrypt(keycard.safe.description, key),
                keycards: keycard.safe.keycards,
                items: await Promise.all(
                    keycard.safe.items.map(
                        async (item) => ({
                            ...item,
                            ...JSON.parse(await AES.decrypt(item.data, key)),
                        })
                    )
                ),
            },
        };
    }

    public static async create(publicKey: string, name: string, description?: string): Promise<{ message: string, keycard: KeycardType }> {
        type ResponseType = {
            message: "keycard_create_success";
            keycard: EncryptedKeycardType;
        };

        // generate a secret for the safe
        const secret = await Secret.generate();

        // create the safe on the server
        const { keycard, message } = await post<ResponseType>("/safe", {
            body: JSON.stringify({
                // safe related information
                name: AES.encrypt(name, secret),
                description: AES.encrypt(description, secret),
                
                // keycard realted information
                secret: await RSA.encrypt(secret, publicKey),
            })
        });

        // send back the new keycard object to be stored in a context
        return {
            message,
            keycard: {
                ...keycard,
                safe: {
                    ...keycard.safe,
                    name,
                    description,
                    items: [],
                },
            },
        };
    }
}