import CryptoJS from "crypto-js"

const PBKDF2 = {
    hash: (passphrase: string, salt: string, size: number = 256, iterations?: number) => {
        return CryptoJS.PBKDF2(passphrase, salt, {
            keySize: size / 32,
            iterations,
        }).toString(CryptoJS.enc.Base64);
    }
}

export default PBKDF2;