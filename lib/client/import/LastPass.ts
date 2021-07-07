import papa from "papaparse";
import { AccountType, CreditCardType } from "../api/Item";

type AccountTypeWithoutID = Omit<AccountType, "id">;
type CreditCardTypeWithoutID = Omit<CreditCardType, "id">;
type ItemTypeWithoutID = AccountTypeWithoutID | CreditCardTypeWithoutID;

export default class LastPass {
    public static convert(input: string) {
        const response: ItemTypeWithoutID[] = [];

        const rows = papa.parse<string[]>(input).data;
        for(let i = 1; i < rows.length; i++) {
            const row = rows[i];

            if(this.isAccount(row)) response.push(this.formatAccount(row));
            else if(this.isCreditCard(row)) response.push(this.formatCreditCard(row));
        }

        return response;
    }

    private static isAccount(data: string[]) {
        return !(this.isCreditCard(data));
    }

    private static isCreditCard(data: string[]) {
        return data[0] === "http://sn" && data[4]?.startsWith("NoteType:Credit Card");
    }

    private static formatCreditCard(data: string[]): CreditCardTypeWithoutID {
        const content = data[4];
        const rows = content.split(/\r?\n/);

        let card: CreditCardTypeWithoutID = {
            type: "credit-card",
            name: data[5],
        };

        for(const row of rows) {
            if(row.startsWith("Name on Card")) card.cardholder = row.replace("Name on Card:", "").trim();
            if(row.startsWith("Number")) card.number = row.replace("Number:", "");
            if(row.startsWith("Security Code")) card.cvc = row.replace("Security Code:", "");
            if(row.startsWith("Notes")) card.description = row.replace("Notes:", "");
            if(row.startsWith("Expiration Date")) {
                const date = new Date(row.replace("Expiration Date:", ""));
            
                const year = date.getFullYear().toString().substr(-2); 
                const month = `${date.getMonth() < 9 ? "0" : ""}${date.getMonth()+1}`;
                
                card.expiry = `${month}/${year}`;
            }
        }

        return card;
    }

    private static formatAccount(data: string[]): AccountTypeWithoutID {
        // [url, username, password, totp, extra, name, grouping, fav]
        let fallback = "";

        try {
            fallback = new URL(data[0]).hostname;
        } catch(e) {
            console.info("error parsing url: ", e);
        }

        return {
            platform: data[5] || fallback,
            type: "account",
            url: data[0],
            username: data[1],
            password: data[2],
            totp: data[3],
        };
    }
}