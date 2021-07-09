export default class Placeholder {
    public static generate(length: number, start: number = 0) {
        const resp: number[] = [];
        const size = Math.floor(Math.random() * length) + start;

        for(let i = 0; i < size; i++) {
            resp.push(i);
        }

        return resp;
    }
}