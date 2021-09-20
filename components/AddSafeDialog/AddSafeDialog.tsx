import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import SafeNameTextField from "../SafeNameTextField/SafeNameTextField";
import Safe from "@lib/api/Safe";
import { useSnackbar } from "notistack";
import { useKeycards } from "@components/KeycardProvider";
import { useRSA } from "@components/RSAProvider";

type AddSafeDialogProps = DialogProps & {
    onBack: () => void;
};

const AddSafeDialog = (props: AddSafeDialogProps) => {
    const [name, setName] = useState("");
    const [disabled, setDisabled] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { addKeycard } = useKeycards();
    const { publicKey } = useRSA();

    const create = async () => {
        // disable button to prevent multiple sends
        setDisabled(true);

        // communicate with the api to create the safe
        const { keycard } = await Safe.create(publicKey, name);
        
        // show the user a snackbar
        enqueueSnackbar("Safe has been successfully created!", {
            variant: "success",
        });
        
        // re-enable the button after safe has been created
        setDisabled(false);

        // add the keycard to already loaded ones
        addKeycard(keycard);

        // close the open dialog
        props.onClose({}, "backdropClick");
    };

    return (
        <Dialog {...props}>
            <DialogTitle>
                Create new safe
            </DialogTitle>
            <DialogContent>
                <SafeNameTextField 
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={disabled}
                    onClick={() => props.onBack()}
                >
                    Back
                </Button>
                <Button
                    disabled={disabled}
                    onClick={() => props.onClose({}, "backdropClick")}
                >
                    Close
                </Button>
                <Button
                    disabled={disabled}
                    onClick={create}
                    color={"primary"}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddSafeDialog;