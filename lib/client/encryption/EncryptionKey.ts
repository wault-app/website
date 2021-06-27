export default class EncryptionKey {
    public static save(vaultid: string, value: string) {
        localStorage.setItem(this.getLocation(vaultid), value); 
    }

    public static get(vaultid: string) {
        return localStorage.getItem(this.getLocation(vaultid));
    }
    
    private static getLocation(vaultid: string) {
        return `encryption_key_${vaultid}`;
    }
}