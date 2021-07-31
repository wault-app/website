import { useKeycards } from "@components/providers/KeycardProvider";
import Item from "@lib/api/Item";
import { Dialog, Button, DialogActions, DialogContent, DialogProps, Grid, makeStyles, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useState } from "react";
import CreditCard, { Focused as FocusType } from "react-credit-cards";
import CardHolderNameField from "./AddCreditCardDialog/CardHolderNameField";
import CreditCardCVCField from "./AddCreditCardDialog/CreditCardCVCField";
import CreditCardNumberField from "./AddCreditCardDialog/CreditCardNumberField";
import ExpirationDateField from "./AddCreditCardDialog/ExpirationDateField";
import SelectSafeField from "./SelectSafeField";

export type AddCreditCardDialogProps = DialogProps & {
    onBack: () => void;
};

const AddCreditCardDialog = (props: AddCreditCardDialogProps) => {
    const { keycards, addItem } = useKeycards();
    const { enqueueSnackbar } = useSnackbar();

    const classes = useStyles();
    const [cvc, setCVC] = useState("");
    const [expiry, setExpiry] = useState("");
    const [name, setName] = useState("");
    const [cardholder, setCardholder] = useState("");
    const [number, setNumber] = useState("");
    const [focused, setFocused] = useState<FocusType>();
    const [keycard, setKeycard] = useState(keycards[0]);
    const [disabled, setDisabled] = useState(false);

    const create = async () => {
        setDisabled(true);

        try {
            const { item } = await Item.create(keycard.safe, {
                type: "credit-card",
                number,
                cardholder,
                expiry,
                cvc,
                name,
            });

            addItem(keycard, item);

            enqueueSnackbar("Successfully added credit card!", {
                variant: "success",
            });
        } catch(e) {
            enqueueSnackbar(e.message, { 
                variant: "error",
            });
        }
    
        setDisabled(false);
    };

    return (
        <Dialog {...props}>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.card}>
                        <CreditCard
                            cvc={cvc}
                            expiry={expiry}
                            name={cardholder}
                            number={number}
                            focused={focused}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label={"Card's name"}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
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
                            value={cardholder}
                            onFocus={() => setFocused("name")}
                            onChange={(e) => setCardholder(e.target.value)}
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
                    <Grid item xs={12}>
                        <SelectSafeField
                            value={keycard.safe.id}
                            onChange={(e) => setKeycard(keycards.find((keycard) => keycard.safe.id === e.target.value))}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => props.onBack()}
                    disabled={disabled}
                >
                    Back
                </Button>
                <Button
                    onClick={() => props.onClose({}, "backdropClick")}
                    disabled={disabled}
                >
                    Close
                </Button>
                <Button
                    onClick={create}
                    disabled={disabled}
                    color={"primary"}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
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


export default AddCreditCardDialog;