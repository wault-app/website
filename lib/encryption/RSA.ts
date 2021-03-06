export type KeyPairType = {
    publicKey: string;
    privateKey: string;
};

const RSA = {
    encrypt: async (text: string, publicKey: string) => {
        const Forge = await import("node-forge");
        return await Forge.util.encode64(Forge.pki.publicKeyFromPem(publicKey).encrypt(text, "RSA-OAEP"));
    },
    decrypt: async (hash: string, privateKey: string) => {
        const Forge = await import("node-forge");
        return await Forge.pki.privateKeyFromPem(privateKey).decrypt(Forge.util.decode64(hash), "RSA-OAEP");
    },
    generate: async(length: number = 2048): Promise<KeyPairType> => {
        const Forge = await import("node-forge");
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
    },
};

export default RSA;