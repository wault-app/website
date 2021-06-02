import { Grid, Typography } from "@material-ui/core";
import { useState } from "react";

export type AddAccountScreenProps = {

};

const AddAccountScreen = (props: AddAccountScreenProps) => {
    const [platform, setPlatform] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h6"} >
                    Add new account
                </Typography>
            </Grid>
        </Grid>
    );
};

export default AddAccountScreen;