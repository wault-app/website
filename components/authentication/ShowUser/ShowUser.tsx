import { Button, Grid, Typography } from "@material-ui/core";
import { ArrowBackRounded as BackIcon } from "@material-ui/icons";

export type ShowUserProps = {
    onBack: () => void;
    user: {
        name: string;
        image?: string;
    };
};

const ShowUser = ({ onBack, user }: ShowUserProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">
                    Welcome back, {user.name}!
                </Typography>
                <Typography>
                    If you can see your name here, then you can click on the continue in the application!
                </Typography>
            </Grid>
            <Grid item xs={12} justify={"center"}>
                <Button
                    onClick={() => onBack()}
                    startIcon={<BackIcon />}
                >
                    Back
                </Button>
            </Grid>
        </Grid>
    );
};

export default ShowUser;