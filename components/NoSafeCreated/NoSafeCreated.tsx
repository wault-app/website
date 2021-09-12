import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import EmptyCanvasIllustration from "@components/EmptyCanvasIllustration";

const NoSafeCreated = () => {
    const classes = useStyles();

    return (
        <Container maxWidth={"sm"} className={classes.container}>
            <Grid container alignItems={"center"} className={classes.fullHeight}>
                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justify={"center"}>
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
    container: {
        padding: theme.spacing(8, 0, 8, 0),
    },
}));

export default NoSafeCreated;