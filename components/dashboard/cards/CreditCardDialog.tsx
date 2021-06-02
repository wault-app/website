import { IssuerType } from "@lib/client/credit-cards/issuers";
import { Grid, makeStyles } from "@material-ui/core";
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
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {!decrypted ? (
                <EnterCVCScreen
                    onDecrypt={(decrypted) => setDecrypted(decrypted)}
                />
            ) : (
                <DecryptedCreditCardScreen
                    creditCard={decrypted}
                />
            )}
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        transition: "1s all linear",
    },
}));

export default CreditCardDialog;