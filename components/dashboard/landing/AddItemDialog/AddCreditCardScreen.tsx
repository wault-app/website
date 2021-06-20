import { DialogFooter } from "@components/DialogProvider";
import { Button, CardContent, DialogContent, Grid, makeStyles, TextField } from "@material-ui/core";
import { Fragment, useState } from "react";
import CreditCard, { Focused as FocusType } from "react-credit-cards";
import CardHolderNameField from "./AddCreditCardScreen/CardHolderNameField";
import CreditCardCVCField from "./AddCreditCardScreen/CreditCardCVCField";
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
        <Fragment>
            <DialogContent>
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
                        <CardHolderNameField
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
                        <CreditCardCVCField
                            number={number}
                            value={cvc}
                            onFocus={() => setFocused("cvc")}
                            onChange={(e) => setCVC(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogFooter>
                <Button>Add</Button>
            </DialogFooter>
        </Fragment>
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


export default AddCreditCardScreen;