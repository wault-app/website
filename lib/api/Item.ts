import post from "./fetch/post";
import AES from "../encryption/AES";
import { EncryptedItemType, ItemType, ItemTypeWithoutID, KeycardType } from "@wault/typings";
import RSA from "@lib/encryption/RSA";

export default class Item {
    /**
     * Create a new item on the remote server
     * @param safe {SafeType} the safe that you want to add the item to
     * @param item {ItemType} the item that you want to add
     */
    public static async create(keycard: KeycardType, item: ItemTypeWithoutID, privateKey: string): Promise<{ message: string; item: ItemType; }> {
        type ResponseType = {
            item: EncryptedItemType;
            message: "successfully_created_item";
        };

        // decrypt keycard key using userkey
        const key = await RSA.decrypt(keycard.secret, privateKey);

        // encrypt the given data
        const data = await AES.encrypt(JSON.stringify(item), key);

        // send the encrypted data to the server 
        const resp = await post<ResponseType>("/item", {
            method: "POST",
            body: JSON.stringify({
                safeid: keycard.safe.id,
                data,
            }),
        });

        return {
            message: resp.message,
            item: {
                id: resp.item.id,
                ...item,
            },
        };
    }

    public static async edit(item: ItemType, keycard: KeycardType, newData: ItemTypeWithoutID, privateKey: string): Promise<{ message: string; item: ItemType; }> {
        type ResponseType = {
            message: "item_edit_success";
            item: EncryptedItemType;
        };

        // load user's encryption key
        const key = await RSA.decrypt(keycard.secret, privateKey);

        // encrypt the given data
        const data = await AES.encrypt(JSON.stringify(item), key);

        const resp = await post<ResponseType>(`/item/${item.id}`, {
            method: "PUT", 
            body: JSON.stringify({
                data,
            }),
        });

        return {
            message: resp.message,
            item: {
                id: resp.item.id,
                ...newData,
            },
        };
    }

    public static async delete(item: ItemType) {
        type ResponseType = {
            message: "item_delete_success";
        };

        return await post<ResponseType>(`/item/${item.id}`, {
            method: "DELETE", 
        });
    }
}