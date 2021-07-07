import { useState, Fragment } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from "@material-ui/core";
import SafeNameField from "./AddSafeDialog/SafeNameField";
import Safe from "@lib/client/api/Safe";
import { useSnackbar } from "notistack";
import { useKeycards } from "@components/providers/KeycardProvider";

type AddSafeDialogProps = DialogProps & {
    onBack: () => void;
};

const AddSafeDialog = (props: AddSafeDialogProps) => {
    const [name, setName] = useState("");
    const [disabled, setDisabled] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { addKeycard } = useKeycards();

    const create = async () => {
        // disable button to prevent multiple sends
        setDisabled(true);

        // communicate with the api to create the safe
        const keycard = await Safe.create(name);
        
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
                <SafeNameField 
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