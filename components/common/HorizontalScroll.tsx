import { Grid, GridProps, makeStyles } from "@material-ui/core";

export type HorizontalScrollProps = GridProps;

const HorizontalScroll = (props: HorizontalScrollProps) => {
    const classes = useStyles();

    return (
        <Grid className={classes.list} {...props}>
            {props.children}
        </Grid>
    );
};

const useStyles = makeStyles(() => (
    {
        list: {
            overflowX: "auto",
            whiteSpace: "nowrap",
            flexWrap: "nowrap",
        }
    }
));

export default HorizontalScroll;