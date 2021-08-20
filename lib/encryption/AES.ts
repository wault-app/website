import CryptoJS from "crypto-js";
import CryptoJSAES from "crypto-js/aes";

export default class AES {
    private key: string;

    constructor(secret: string) {
        this.key = secret;
    }

    public encrypt(text: string) {
        return CryptoJSAES.encrypt(text, this.key).toString();
    }

    public static encrypt(text: string, key: string) {
        return CryptoJSAES.encrypt(text, key).toString();
    }

    public decrypt(hash: string) {
        if(!hash) return;

        return CryptoJSAES.decrypt(hash, this.key).toString(CryptoJS.enc.Utf8);
    }

    public static decrypt(text: string, key: string) {
        if(!text) return;
        return CryptoJSAES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    }

}