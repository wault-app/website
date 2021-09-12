import CryptoJS from "crypto-js";
import CryptoJSAES from "crypto-js/aes";

const AES = {
    encrypt: (text: string, key: string) => {
        return CryptoJSAES.encrypt(text, key).toString();
    },
    decrypt: (text: string, key: string) => {
        if(!text) return;
        return CryptoJSAES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    },
};

export default AES;