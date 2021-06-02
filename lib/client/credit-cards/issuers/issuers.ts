const issuers: {
    [key: string]: {
        name: string;
        color: string;
    };
} = {
    "mastercard": {
        name: "MasterCard",
        color: "linear-gradient(25deg, #f37b26, #fdb731)",
    },
    "visa": {
        name: "Visa",
        color: "linear-gradient(25deg, #0f509e, #1399cd)",
    },
    "discover": {
        name: "Discover",
        color: "linear-gradient(25deg, #fff, #eee)",
    },
    "amex": {
        name: "American Express",
        color: "linear-gradient(25deg, #308c67, #a3f2cf)",
    },
    "jcb": {
        name: "JCB",
        color: "linear-gradient(25deg, #939393, #717171)",
    },
    "dinersclub": {
        name: "Dinersclub",
        color: "linear-gradient(25deg, #fff, #eee)",
    },
    "maestro": {
        name: "Maestro",
        color: "linear-gradient(25deg, #fbfbfb, #e8e9e5)",
    },
    "laser": {
        name: "Laser",
        color: "linear-gradient(25deg, #939393, #717171)",
    },
    "unionpay": {
        name: "UnionPay",
        color: "linear-gradient(25deg, #939393, #717171)",
    },
    "elo": {
        name: "Elo",
        color: "linear-gradient(25deg, #211c18, #aaa7a2)",
    },
    "unknown": {
        name: "Unknown",
        color: "linear-gradient(25deg, #999, #999)",
    }
};

export type IssuerType = keyof typeof issuers;

export default class Issuers {
    public static get(name: IssuerType) {
        if(!issuers[name]) {
            return issuers.unknown;
        }

        return issuers[name];
    }
}