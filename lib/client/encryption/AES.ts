import CryptoJS from "crypto-js";
import CryptoJSAES from "crypto-js/aes";
import PBKDF2 from "pbkdf2";

export default class AES {
    private key: string;

    constructor(secret: string, salt = "localhost") {
        this.key = this.generateKey(secret, salt).toString();
    }

    private generateKey(secret: string, salt: string) {
        return PBKDF2.pbkdf2Sync(secret, salt, 100000, 256 / 8, "sha512");
    }

    public encrypt(text: string) {
        return CryptoJSAES.encrypt(text, this.key).toString();
    }

    public decrypt(hash: string) {
        return CryptoJSAES.decrypt(hash, this.key).toString(CryptoJS.enc.Utf8);
    }
}