export default class EncryptionKey {
    /**
     * Generates a random hex string
     * @param length how long should be the key
     * @returns a random string
     */
    public static async generate(length = 1024) {
        let resp = "";
        const pool = "0123456789abcdef";

        for(let i = 0; i < length; i++) {
            resp += pool[Math.random() * pool.length];
        }

        return resp;
    }

    public static save(safeid: string, value: string) {
        localStorage.setItem(this.getLocation(safeid), value); 
    }

    public static get(safeid: string) {
        return localStorage.getItem(this.getLocation(safeid));
    }
    
    private static getLocation(safeid: string) {
        return `encryption_key_${safeid}`;
    }
}