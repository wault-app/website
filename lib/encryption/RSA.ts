import Forge from "node-forge";

export type KeyPairType = {
    publicKey: string;
    privateKey: string;
};

export default class RSA {
    public static async encrypt(text: string, publicKey: string) {
        return await Forge.util.encode64(Forge.pki.publicKeyFromPem(publicKey).encrypt(text, "RSA-OAEP"));
    }

    public static async decrypt(hash: string, privateKey: string) {
        return await Forge.pki.privateKeyFromPem(privateKey).decrypt(Forge.util.decode64(hash), "RSA-OAEP");
    }

    public static async generate(length: number = 2048): Promise<KeyPairType> {
        return new Promise(async (resolve, reject) => {
            Forge.pki.rsa.generateKeyPair({
                bits: length,
                workers: -1,
            }, async (err, keys) => {
                if(err) reject(err);
                
                const [publicKey, privateKey] = [
                    Forge.pki.publicKeyToPem(keys.publicKey),
                    Forge.pki.privateKeyToPem(keys.privateKey), 
                ];
        
                resolve({
                    publicKey,
                    privateKey
                });
            });
    
        });
    }
}