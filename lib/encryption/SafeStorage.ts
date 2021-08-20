export default class SafeStorage {
    public static async set(key: string, data: string) {
        return new Promise(async (resolve, reject) => {
            const keys = await this.makeKeys(4096);

            if (!("TextEncoder" in window)) reject(new Error("Sorry, this browser does not support TextEncoder..."));

            const enc = new TextEncoder();
            const encoded = enc.encode(data);
            console.log(encoded);
            const encrypted = await this.encrypt(encoded, keys);


            this.callOnStore((store) => {
                store.put({
                    id: key,
                    keys,
                    encrypted
                });

                resolve(encrypted);
            });
        });
    }

    public static async get(key: string): Promise<string> {
        return new Promise((resolve, reject) => {

            console.log(window?.TextDecoder);
            if (!("TextDecoder" in window)) reject(new Error("Sorry, this browser does not support TextEncoder..."));

            const enc = new TextDecoder();

            this.callOnStore(
                (store) => {
                    const getData = store.get(key);
                    getData.onsuccess = async () => {
                        if (!getData.result) {
                            resolve(null);
                            return;
                        }

                        const { keys, encrypted } = getData.result;
                        const data = await this.decrypt(encrypted, keys);

                        resolve(enc.decode(data));
                    };
                }
            );
        });
    }

    private static callOnStore(fn: (store: IDBObjectStore) => void) {

        // This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
        // @ts-ignore
        const indexedDB: typeof window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

        // Open (or create) the database
        const open = indexedDB.open("MyDatabase", 1);

        // Create the schema
        open.onupgradeneeded = function () {
            const db = open.result;
            db.createObjectStore("MyObjectStore", {
                keyPath: "id"
            });
        };


        open.onsuccess = function () {
            // Start a new transaction
            var db = open.result;
            var tx = db.transaction("MyObjectStore", "readwrite");
            var store = tx.objectStore("MyObjectStore");

            fn(store);

            // Close the db when the transaction is done
            tx.oncomplete = function () {
                db.close();
            };
        }
    }

    public static async makeKeys(bits: number = 4096): Promise<CryptoKeyPair> {
        return await window.crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: bits, //can be 1024, 2048, or 4096
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                hash: { name: "SHA-256" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
            },
            false, //whether the key is extractable (i.e. can be used in exportKey)
            ["encrypt", "decrypt"] //must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
        )
    }

    private static encrypt(data: Uint8Array, keys: CryptoKeyPair) {
        return window.crypto.subtle.encrypt(
            {
                name: "RSA-OAEP",
                //label: Uint8Array([...]) //optional
            },
            keys.publicKey, //from generateKey or importKey above
            data //ArrayBuffer of data you want to encrypt
        )
    }

    private static async decrypt(data: ArrayBuffer, keys: CryptoKeyPair) {
        return new Uint8Array(await window.crypto.subtle.decrypt(
            {
                name: "RSA-OAEP",
                //label: Uint8Array([...]) //optional
            },
            keys.privateKey, //from generateKey or importKey above
            data //ArrayBuffer of the data
        ));
    }
}
