import { PropsWithChildren } from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";

export type ErrorScreenProps = PropsWithChildren<{
    error: Error;
}>;

const ErrorScreen = (props: ErrorScreenProps) => {
    const classes = useStyles();
    
    console.error(props.error);

    return (
        <Grid
            container
            alignItems={"center"}
            className={classes.root}
        >
            <Grid item xs={12}>
                <Container>
                    <Typography variant={"h5"} gutterBottom>
                        Something went wrong!
                    </Typography>
                    <Typography>
                        {props.error.message}
                    </Typography>
                    {props.children}
                </Container>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
    },
}));

export default ErrorScreen;