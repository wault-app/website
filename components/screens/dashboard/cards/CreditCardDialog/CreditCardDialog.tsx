import { IssuerType } from "@lib/client/credit-cards/issuers";
import { Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import EnterCVCScreen from "./EnterCVCScreen";

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
        <div />
    );
};


export default CreditCardDialog;