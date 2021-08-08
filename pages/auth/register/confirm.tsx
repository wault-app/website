import { Button, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RedirectPage = () => {
    const classes = useStyles();
    const router = useRouter();

    const { id, secret } = router.query;

    useEffect(() => {
        if(id && secret) window?.location.replace(`intent://${id}:${secret}#Intent;scheme=wault-auth;package=app.wault;end`);
    }, [id, secret]);

    return (
        <Grid
            container
            alignItems={"center"}
            className={classes.root}
        >
            <Grid item xs={12}>
                <Container maxWidth={"sm"}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant={"h5"} align={"center"}>
                                Click on the button!
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align={"center"}>
                                We are using this to authenticate you to our application.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.center}>
                            <Button color={"primary"} variant={"outlined"} href={`intent://${id}:${secret}#Intent;scheme=wault-auth;package=app.wault;end`}>
                                Continue
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles(() => ({
    root: {
        height: "100%",
    },
    center: {
        textAlign: "center",
    },
}));

export default RedirectPage;