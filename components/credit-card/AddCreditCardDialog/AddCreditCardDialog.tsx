import { useKeycards } from "@components/providers/KeycardProvider";
import { useRSA } from "@components/providers/RSAProvider";
import Item from "@lib/api/Item";
import { Dialog, Button, DialogActions, DialogContent, DialogProps, Grid, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import CreditCard, { Focused as FocusType } from "react-credit-cards";
import CardHolderNameTextField from "@components/inputs/CreditCardHolderNameTextField";
import CreditCardCVCTextField from "@components/inputs/CreditCardCVCTextField";
import CreditCardNumberField from "@components/inputs/CreditCardNumberTextField";
import CreditCardExperiationDateTextField from "@components/inputs/CreditCardExperiationDateTextField";
import SafeSelector from "@components/inputs/SafeSelector";

export type AddCreditCardDialogProps = DialogProps & {
    onBack: () => void;
};

const AddCreditCardDialog = (props: AddCreditCardDialogProps) => {
    const { keycards, addItem } = useKeycards();
    const { enqueueSnackbar } = useSnackbar();

    const [cvc, setCVC] = useState("");
    const [expiry, setExpiry] = useState("");
    const [name, setName] = useState("");
    const [cardholder, setCardholder] = useState("");
    const [number, setNumber] = useState("");
    const [focused, setFocused] = useState<FocusType>();
    const [keycard, setKeycard] = useState(keycards[0]);
    const [disabled, setDisabled] = useState(false);

    const { privateKey } = useRSA();

    const create = async () => {
        setDisabled(true);

        try {
            const { item } = await Item.create(keycard, {
                type: "credit-card",
                number,
                cardholder,
                expiry,
                cvc,
                name,
            }, privateKey);

            addItem(keycard, item);

            enqueueSnackbar("Successfully added credit card!", {
                variant: "success",
            });

            setNumber("");
            setCVC(""),
            setExpiry("");
            setCardholder("");
            setName("");
            setKeycard(keycards[0]);
            
            props.onClose({}, "escapeKeyDown");
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
                    <Grid item xs={12}>
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
                        <CardHolderNameTextField
                            value={cardholder}
                            onFocus={() => setFocused("name")}
                            onChange={(e) => setCardholder(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CreditCardExperiationDateTextField
                            onFocus={() => setFocused("expiry")}
                            onChange={(e) => setExpiry(e.target.value)}
                            value={expiry}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CreditCardCVCTextField
                            number={number}
                            value={cvc}
                            onFocus={() => setFocused("cvc")}
                            onChange={(e) => setCVC(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SafeSelector
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

export default AddCreditCardDialog;