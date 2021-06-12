import NodeRSA from "node-rsa";

export default class PrivateRSA {
    private key: NodeRSA;

    constructor(privateKey: string) {
        this.key = new NodeRSA(privateKey);
    }
    
    public decrypt(encrypted: string) {
        return this.key.decrypt(encrypted, "utf8");
    }

    public encrypt(text: string) {
        return this.key.encrypt(text, "base64")
    }

    public exportKey() {
        return this.key.exportKey("public");
    }

    public save() {
        localStorage.setItem("rsa-key", this.key.exportKey());
    }

    public static create(b = 2048) {
        const key = new NodeRSA({ b });
        return new PrivateRSA(key.exportKey());
    }

    public static async load() {
        const key = localStorage.getItem("rsa-key");
        if(!key) throw new Error("key not stored yet");

        return new PrivateRSA(key);
    } 
}