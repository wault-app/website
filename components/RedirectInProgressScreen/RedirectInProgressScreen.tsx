import { Container, Grid, Typography } from "@mui/material";

export type RedirectInProgressScreenProps = {};

const RedirectInProgressScreen = (props: RedirectInProgressScreenProps) => (
    <Grid
        container
        sx={{
            height: "100%",
        }}
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

export default RedirectInProgressScreen;