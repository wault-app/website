import { Container, Grid, Typography } from "@mui/material";
import EmptyCanvasIllustration from "@components/images/EmptyCanvasIllustration";

const NoSafeCreated = () => (
    <Container maxWidth={"sm"} sx={{ pt: 8, pb: 8 }}>
        <Grid container alignItems={"center"} sx={{ maxHeight: "100%" }}>
            <Grid item>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent={"center"}>
                            <Grid item>
                                <EmptyCanvasIllustration style={{ width: "100%", maxWidth: 300 }} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} align={"center"}>
                            Create a safe!
                        </Typography>
                        <Typography align={"center"}>
                            In Wault everything is stored inside a safe. Create yours now!
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Container>
);

export default NoSafeCreated;