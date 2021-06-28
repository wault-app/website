import { useState, Fragment } from "react";
import { Button, DialogContent, DialogTitle } from "@material-ui/core";
import { DialogFooter, useDialog } from "@components/providers/DialogProvider";
import SafeNameField from "./AddSafeScreen/SafeNameField";
import Safe from "@lib/client/api/Safe";
import { useSnackbar } from "notistack";
import { useKeycards } from "@components/providers/KeycardProvider";

const AddSafeScreen = () => {
    const [name, setName] = useState("");
    const [disabled, setDisabled] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    // const { close } = useDialog();
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
        // close();
    };

    return (
        <Fragment>
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
            <DialogFooter>
                <Button
                    disabled={disabled}
                    onClick={create}
                >
                    Add
                </Button>
            </DialogFooter>
        </Fragment>
    );
};

export default AddSafeScreen;