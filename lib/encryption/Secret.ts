export default class Secret {
    /**
     * Generates a random hex string
     * @param length how long should be the key
     * @returns a random string
     */
         public static async generate(length = 128) {
            let resp = "";
            const pool = "0123456789abcdef";
    
            for(let i = 0; i < length; i++) {
                resp += pool[Math.floor(Math.random() * pool.length)];
            }
    
            return resp;
        }
    
}