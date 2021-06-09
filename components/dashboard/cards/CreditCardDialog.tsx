import { IssuerType } from "@lib/client/credit-cards/issuers";
import { useState } from "react";
import DecryptedCreditCardScreen from "./CreditCardDialog/DecryptedCreditCardScreen";
import EnterCVCScreen from "./CreditCardDialog/EnterCVCScreen";

export type CreditCardDialogProps = {
    uuid: string;
};

export type CreditCardType = {
    uuid: string;
    name: string;
    issuer: IssuerType;
    number: string;
    cardHolder: string;
    expiry: string;
    cvc: string;
};

const CreditCardDialog = (props: CreditCardDialogProps) => {
    const [decrypted, setDecrypted] = useState<CreditCardType>();

    if(!decrypted) {
        return (
            <EnterCVCScreen
                onDecrypt={(decrypted) => setDecrypted(decrypted)}
            />
        );
    }

    return (
        <DecryptedCreditCardScreen
            creditCard={decrypted}
        />
    );
};

export default CreditCardDialog;