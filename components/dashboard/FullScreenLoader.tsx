import { Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";

export type FullScreenLoaderProps = {};

const FullScreenLoader = (props: FullScreenLoaderProps) => {
    const [loaded, setLoaded] = useState(false);
    const classes = useStyles();

    return (
        <Grid
            container
            className={classes.root}
            alignItems={"center"}
        >
            <Grid item xs={12} className={classes.center}>
                <img 
                    onLoad={() => setLoaded(true)}
                    src={"/img/icon.svg"}
                    className={`${classes.image} ${loaded ? classes.rotate : ""}`}
                />
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
    },
    center: {
        textAlign: "center",
    },
    image: {
        width: 156,
        maxWidth: "100%",
        transition: "1s all ease-in-out",
    },
    rotate: {
        transform: "rotate(360deg)",
    },
}));

export default FullScreenLoader;