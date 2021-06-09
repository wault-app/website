import { DialogFooter } from "@components/DialogProvider";
import PlatformIcon from "@components/PlatformIcon";
import { Button, DialogContent, DialogTitle, Grid, InputAdornment, TextField, Typography } from "@material-ui/core";
import { Fragment, useState } from "react";
import DescriptionField from "./AddAccountScreen/DescriptionField";
import PasswordField from "./AddAccountScreen/PasswordField";
import PlatformField from "./AddAccountScreen/PlatformField";
import UsernameField from "./AddAccountScreen/UsernameField";

export type AddAccountScreenProps = {

};

const AddAccountScreen = (props: AddAccountScreenProps) => {
    const [platform, setPlatform] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");

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
                        <DescriptionField
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogFooter>
                <Button>
                    Add
                </Button>
            </DialogFooter>
        </Fragment>
    );
};

export default AddAccountScreen;