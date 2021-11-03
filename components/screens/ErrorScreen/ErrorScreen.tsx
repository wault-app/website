import { PropsWithChildren } from "react";
import { Container, Grid, Typography } from "@mui/material";

export type ErrorScreenProps = PropsWithChildren<{
    error: Error;
}>;

const ErrorScreen = (props: ErrorScreenProps) => {
    console.error(props.error);

    return (
        <Grid
            container
            alignItems={"center"}
            sx={{ height: "100%" }}
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

export default ErrorScreen;