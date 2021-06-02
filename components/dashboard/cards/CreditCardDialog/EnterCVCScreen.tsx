import CreditCardCVCField from "@components/dashboard/landing/AddItemDialog/AddCreditCardScreen/CreditCardCVCField";
import { useDialog } from "@components/DialogProvider";
import { Button, CardActions, CardContent, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@material-ui/core";
import { Fragment, useState } from "react";
import { CreditCardType } from "../CreditCardDialog";

export type EnterCVCScreenProps = {
    onDecrypt: (data: CreditCardType) => any;
};

const EnterCVCScreen = ({ onDecrypt }: EnterCVCScreenProps) => {
    const [cvc, setCVC] = useState("");
    const { close } = useDialog();

    return (
        <Fragment>
            <DialogTitle>
                Please enter your CVC!
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This is required because of extra level of protection for credit/debit cards in our system.
                </DialogContentText>

                <CreditCardCVCField
                    value={cvc}
                    fullWidth={false}
                    number={""}
                    onChange={(e) => setCVC(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Close</Button>
                <Button
                    disabled={cvc.length < 3}
                    onClick={() => onDecrypt({
                        uuid: "123123-12312312-12123123",
                        number: "5111 1111 1111 1111",
                        expiry: "12/22",
                        cardHolder: "Jhon Doe",
                        cvc,
                        issuer: "mastercard",
                        name: "My Mastercard"
                    })}
                >
                    Continue
                    </Button>
            </DialogActions>
        </Fragment>
    );
};

export default EnterCVCScreen;