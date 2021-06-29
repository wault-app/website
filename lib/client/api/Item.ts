import post from "./fetch/post";
import { SafeType } from "./Safe";
import EncryptionKey from "../encryption/EncryptionKey";
import AES from "../encryption/AES";
import { CategoryType } from "../categories";

export type EncryptedItemType = {
    id: string;
    data: string;
};

export type AccountType = {
    id: string;
    type: "account";
    platform: string;
    username?: string;
    password?: string;
    description?: string;
    categories?: CategoryType[];
};

export type CreditCardType = {
    id: string;
    type: "credit-card";
    name: string;
    number: string;
    cardholder: string;
    expiry: string;
    cvc: string;
};

export type ItemType = AccountType | CreditCardType;

type ItemTypeWithoutID = Omit<AccountType, "id"> | Omit<CreditCardType, "id">;

export default class Item {
    /**
     * Create a new item on the remote server
     * @param safe {SafeType} the safe that you want to add the item to
     * @param item {ItemType} the item that you want to add
     */
    public static async create(safe: SafeType, item: ItemTypeWithoutID): Promise<ItemType> {
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
            id: resp.item.id,
            ...item,
        };
    }
}