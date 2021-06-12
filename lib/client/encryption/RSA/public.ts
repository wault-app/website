import NodeRSA from "node-rsa";

export default class PublicRSA {
    private key: NodeRSA;

    constructor(publicKey: string) {
        this.key = new NodeRSA(publicKey);
    }

    public encrypt(text: string) {
        return this.key.encrypt(text, "base64");
    }
}