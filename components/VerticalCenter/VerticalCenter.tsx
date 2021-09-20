import { Grid, useMediaQuery } from "@mui/material";
import { PropsWithChildren } from "react";
import { makeStyles } from "@mui/styles";

export type VerticalCenterProps = PropsWithChildren<{}>;

const VerticalCenter = (props: VerticalCenterProps) => {
    const isLarge = useMediaQuery('(min-width:600px)');
    const classes = useStyles();

    if(!isLarge) {
        return (
            <div className={classes.fullHeight}>
                {props.children}
            </div>
        );
    }

    return (
        <Grid className={classes.fullHeight} container alignItems={"center"} justifyContent={"center"}>
            <Grid item>
                {props.children}
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    fullHeight: {
        height: "100%",
    },
}));

export default VerticalCenter;