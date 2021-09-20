import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Grid } from "@mui/material";
import { useState } from "react";
import DescriptionField from "@components/DescriptionTextField";
import PasswordField from "@components/PasswordTextField";
import PlatformField from "@components/PlatformTextField";
import UsernameField from "@components/UsernameTextField";
import { useSnackbar } from "notistack";
import Item from "@lib/api/Item";
import { KeycardType } from "@wault/typings";
import { useKeycards } from "@components/KeycardProvider";
import SafeSelector from "../SafeSelector/SafeSelector";
import { useRSA } from "@components/RSAProvider";

export type AddAccountDialogProps = DialogProps & {
    onBack: () => void;
};

const AddAccountDialog = (props: AddAccountDialogProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const { keycards, addItem } = useKeycards();

    const [platform, setPlatform] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [keycard, setKeycard] = useState<KeycardType>(keycards[0]);
    const [disabled, setDisabled] = useState(false);

    const { privateKey } = useRSA();

    const create = async () => {
        // if already in progress, then don't send again
        if(disabled) return;

        // disable the button to prevent multiple sends 
        setDisabled(true);

        try {
            // send the item to remote server
            const { item } = await Item.create(keycard, {
                type: "account",
                platform,
                username,
                password,
                description,
            }, privateKey);

            // pass the new item to the keycard context
            addItem(keycard, item);

            // show a snackbar for the user
            enqueueSnackbar(
                "Successfully added the account!",
                {
                    variant: "success",
                }
            );

            // reset the states
            setPlatform("");
            setUsername("");
            setPassword("");
            setDescription("");
        } catch(e) {
            // show the user a snackbar to tell about the error
            enqueueSnackbar(e.message, {
                variant: "error",
            });
        }
        
        // reenable the button to the user
        setDisabled(false);
    };

    return (
        <Dialog {...props}>
            <DialogTitle>
                Add new account
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PlatformField 
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <UsernameField
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PasswordField
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SafeSelector
                            value={keycard.safe.id}
                            onChange={(e) => setKeycard(keycards.find((keycard) => keycard.safe.id === e.target.value))}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DescriptionField
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                </Grid>
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

export default AddAccountDialog;