import { Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

export type RedirectInProgressScreenProps = {};

const RedirectInProgressScreen = (props: RedirectInProgressScreenProps) => {
    const classes = useStyles();

    return (
        <Grid
            container
            className={classes.root}
            alignItems={"center"}
        >
            <Grid item xs={12}>
                <Container maxWidth={"md"}>
                    <Typography variant={"h5"} gutterBottom>
                        You are being redirected...
                    </Typography>
                    <Typography>
                        Please be patient!
                    </Typography>
                </Container>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles(() => ({
    root: {
        height: "100%",
    },
}));

export default RedirectInProgressScreen;