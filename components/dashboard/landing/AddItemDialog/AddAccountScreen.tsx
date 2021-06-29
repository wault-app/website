import { DialogFooter } from "@components/providers/DialogProvider";
import PlatformIcon from "@components/platforms/PlatformIcon";
import { Button, DialogContent, DialogTitle, Grid, InputAdornment, TextField, Typography } from "@material-ui/core";
import { Fragment, useState } from "react";
import DescriptionField from "./AddAccountScreen/DescriptionField";
import PasswordField from "./AddAccountScreen/PasswordField";
import PlatformField from "./AddAccountScreen/PlatformField";
import UsernameField from "./AddAccountScreen/UsernameField";
import { useSnackbar } from "notistack";
import Item from "@lib/client/api/Item";
import { KeycardType, SafeType } from "@lib/client/api/Safe";
import { useKeycards } from "@components/providers/KeycardProvider";
import SelectSafeField from "./SelectSafeField";

export type AddAccountScreenProps = {

};

const AddAccountScreen = (props: AddAccountScreenProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const { keycards, addItem } = useKeycards();

    const [platform, setPlatform] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [keycard, setKeycard] = useState<KeycardType>(keycards[0]);
    const [disabled, setDisabled] = useState(false);

    const create = async () => {
        // if already in progress, then don't send again
        if(disabled) return;

        // disable the button to prevent multiple sends 
        setDisabled(true);

        try {
            // send the item to remote server
            const item = await Item.create(keycard.safe, {
                type: "account",
                platform,
                username,
                password,
                description,
            });

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
        <Fragment>
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
                        <SelectSafeField
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

export default AddAccountScreen;