import Forge from "node-forge";

export default class RSA {
    public static async encrypt(text: string, publicKey: string) {
        return await Forge.util.encode64(Forge.pki.publicKeyFromPem(publicKey).encrypt(text));
    }

    public static async decrypt(hash: string, privateKey: string) {
        return await Forge.pki.privateKeyFromPem(privateKey).decrypt(Forge.util.decode64(hash));
    }

    public static async load() {
        return await localStorage.getItem("rsa-key");
    }

    private static async save(privateKey: string) {
        return await localStorage.setItem("rsa-key", privateKey);
    }

    public static async generate(bits: number = 512): Promise<{ publicKey: string; privateKey: string }> {
        return new Promise(async (resolve, reject) => {
            Forge.pki.rsa.generateKeyPair({
                bits,
                workers: -1,
            }, async (err, keys) => {
                if(err) reject(err);
                
                const [publicKey, privateKey] = [
                    Forge.pki.publicKeyToPem(keys.publicKey),
                    Forge.pki.privateKeyToPem(keys.privateKey), 
                ];
        
                await this.save(privateKey);
        
                resolve({
                    publicKey,
                    privateKey
                });
            });
    
        });
    }
}