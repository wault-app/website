import CreditCardCVCField from "@components/dashboard/landing/AddItemDialog/AddCreditCardScreen/CreditCardCVCField";
import { Button, CardContent, Grid, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { CreditCardType } from "../CreditCardDialog";

export type EnterCVCScreenProps = {
    onDecrypt: (data: CreditCardType) => any;
};

const EnterCVCScreen = ({ onDecrypt }: EnterCVCScreenProps) => {
    const [cvc, setCVC] = useState("");


    return (
        <CardContent>
            <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={"h5"} gutterBottom>
                        Please enter your CVC!
                    </Typography>
                    <Typography>
                        This is required because of extra level of protection for credit/debit cards in our system.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <CreditCardCVCField
                        value={cvc}
                        fullWidth={false}
                        number={""}
                        onChange={(e) => setCVC(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        disabled={cvc.length < 3}
                        onClick={() => onDecrypt({
                            uuid: "123123-12312312-12123123",
                            number: "5111 1111 1111 1111",
                            expiry: "12/22",
                            cardHolder: "Jhon Doe",
                            cvc: "123",
                            issuer: "mastercard",
                            name: "My Mastercard"
                        })}
                        variant={"contained"}
                    >
                        Continue
                    </Button>
                </Grid>
            </Grid>
        </CardContent>
    );
};

export default EnterCVCScreen;