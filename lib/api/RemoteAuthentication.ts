import RSA, { KeyPairType } from "@lib/encryption/RSA";
import { UserType } from "@wault/typings";
import { io, Socket } from "socket.io-client";
import { ENDPOINT } from "./fetch/get";

export default class RemoteAuthentication {
    constructor(private socket: Socket, private keypair: KeyPairType) {}

    static async start(): Promise<RemoteAuthentication> {
        return new Promise(async (resolve, reject) => {
            const socket = io(ENDPOINT);

            const keypair = await RSA.generate(2048);

            socket.on("connection", () => {
                socket.send("remote-auth/start", {
                    publicKey: keypair.publicKey,
                });
    
                resolve(new RemoteAuthentication(socket, keypair));
            });
        });
    }

    onScan(handler: (user: UserType) => void) {
        this.socket.on("remote-auth/scanned", handler);
    }

    onSuccess(handler: (keypair: KeyPairType) => void) {
        this.socket.on("remote-auth/success", async (tmp: KeyPairType) => {
            handler({
                publicKey: tmp.publicKey,
                privateKey: await RSA.decrypt(tmp.privateKey, this.keypair.privateKey),
            });
        });
    }

    getId() {
        return this.socket.id;
    }
}