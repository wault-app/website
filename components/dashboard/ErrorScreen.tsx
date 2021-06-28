import { PropsWithChildren } from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import WrapperError from "@lib/server/error";

export type ErrorScreenProps = PropsWithChildren<{
    error: WrapperError;
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
                        {props.error.name}
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