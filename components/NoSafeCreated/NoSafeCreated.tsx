import { Container, Grid, Typography } from "@mui/material";
import EmptyCanvasIllustration from "@components/EmptyCanvasIllustration";
import { makeStyles } from "@mui/styles";

const NoSafeCreated = () => {
    const classes = useStyles();

    return (
        <Container maxWidth={"sm"} sx={{ pt: 8, pb: 8 }}>
            <Grid container alignItems={"center"} className={classes.fullHeight}>
                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justifyContent={"center"}>
                                <Grid item>
                                    <EmptyCanvasIllustration className={classes.emptyCanvas} />
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
};

const useStyles = makeStyles((theme) => ({
    emptyCanvas: {
        width: "100%",
        maxWidth: 300,
    },
    fullHeight: {
        minHeight: "100%",
    },
}));

export default NoSafeCreated;