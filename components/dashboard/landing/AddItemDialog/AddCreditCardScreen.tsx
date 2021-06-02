import { CardContent, Grid, makeStyles, TextField } from "@material-ui/core";
import Payment from "payment";
import { useState } from "react";
import CreditCard, { Focused as FocusType } from "react-credit-cards";
import CreditCardNumberField from "./AddCreditCardScreen/CreditCardNumberField";
import ExpirationDateField from "./AddCreditCardScreen/ExpirationDateField";

export type AddCreditCardScreenProps = {};

const AddCreditCardScreen = () => {
    const classes = useStyles();
    const [cvc, setCVC] = useState("");
    const [expiry, setExpiry] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [focused, setFocused] = useState<FocusType>();

    return (
        <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.card}>
                    <CreditCard
                        cvc={cvc}
                        expiry={expiry}
                        name={name}
                        number={number}
                        focused={focused}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CreditCardNumberField
                        onChange={(e) => setNumber(e.target.value)}
                        onFocus={() => setFocused("number")}
                        value={number}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant={"outlined"}
                        label={"Card holder's name"}
                        value={name}
                        onFocus={() => setFocused("name")}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ExpirationDateField
                        onFocus={() => setFocused("expiry")}
                        onChange={(e) => setExpiry(e.target.value)}
                        value={expiry}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        variant={"outlined"}
                        label={"CVC"}
                        onFocus={() => setFocused("cvc")}
                        value={cvc}
                        onChange={(e) => setCVC(formatCVC(e.target.value, cvc, { number }))}
                    />
                </Grid>
            </Grid>
        </CardContent>
    );
};

const useStyles = makeStyles((theme) => ({
    center: {
        textAlign: "center",
    },
    card: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    }
}));

function clearNumber(value = "") {
    return value.replace(/\D+/g, "");
}


function formatCVC(value: string, prevValue: string, allValues: { number: string }) {
    const clearValue = clearNumber(value);
    let maxLength = 4;

    if (allValues.number) {
        const issuer = Payment.fns.cardType(allValues.number);
        maxLength = issuer === "amex" ? 4 : 3;
    }

    return clearValue.slice(0, maxLength);
}

export default AddCreditCardScreen;