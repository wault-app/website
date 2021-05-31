import { Grid, makeStyles, useMediaQuery } from "@material-ui/core";
import { PropsWithChildren } from "react";

export type ResponsiveCardProps = PropsWithChildren<{}>;

const ResponsiveCard = (props: ResponsiveCardProps) => {
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

export default ResponsiveCard;