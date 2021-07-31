import post from "./fetch/post";
import { SafeType } from "./Safe";
import EncryptionKey from "../encryption/EncryptionKey";
import AES from "../encryption/AES";
import { CategoryType } from "../categories";

export type EncryptedItemType = {
    id: string;
    data: string;
    safeId: string;
};

export type AccountType = {
    id: string;
    type: "account";
    platform: string;
    username?: string;
    password?: string;
    description?: string;
    categories?: CategoryType[];
    url?: string;
    totp?: string;
};

export type CreditCardType = {
    id: string;
    type: "credit-card";
    name: string;
    number?: string;
    cardholder?: string;
    expiry?: string;
    cvc?: string;
    description?: string;
};

export type ItemType = AccountType | CreditCardType;

export type AccountTypeWithoutID = Omit<AccountType, "id">;
export type CreditCardTypeWithoutID = Omit<CreditCardType, "id">;
export type ItemTypeWithoutID = AccountTypeWithoutID | CreditCardTypeWithoutID;

export default class Item {
    /**
     * Create a new item on the remote server
     * @param safe {SafeType} the safe that you want to add the item to
     * @param item {ItemType} the item that you want to add
     */
    public static async create(safe: SafeType, item: ItemTypeWithoutID): Promise<{ message: string; item: ItemType; }> {
        type ResponseType = {
            item: EncryptedItemType;
            message: "successfully_created_item";
        };

        // load the encryption key and create a new AES instance
        const key = new AES(await EncryptionKey.get(safe.id));

        // encrypt the given data
        const data = key.encrypt(JSON.stringify(item));

        // send the encrypted data to the server 
        const resp = await post<ResponseType>("/item/create", {
            body: JSON.stringify({
                safeid: safe.id,
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

    public static async edit(item: ItemType, safe: SafeType, newData: ItemTypeWithoutID): Promise<{ message: string; item: ItemType; }> {
        type ResponseType = {
            message: "item_edit_success";
            item: EncryptedItemType;
        };

        // load the encryption key and create a new AES instance
        const key = new AES(await EncryptionKey.get(safe.id));

        // encrypt the given data
        const data = key.encrypt(JSON.stringify(item));

        const resp = await post<ResponseType>("/item/edit", {
            method: "PUT", 
            body: JSON.stringify({
                id: item.id,
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

        return await post<ResponseType>("/item/delete", {
            body: JSON.stringify({
                method: "DELETE", 
                id: item.id,
            }),
        });
    }
}