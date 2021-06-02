import { Card, Container, makeStyles, useMediaQuery } from "@material-ui/core";
import { Fragment, PropsWithChildren } from "react";


const VaultCard = (props: PropsWithChildren<{}>) => {
    const isLarge = useMediaQuery("(min-width: 600px)");
    const classes = useStyles();

    if(isLarge) {
        return (
            <Container className={classes.card} maxWidth={"sm"}>
                <Card variant={"outlined"}>
                    {props.children}
                </Card>
            </Container>
        );
    }

    return (
        <Fragment>
            {props.children}
        </Fragment>
    );
};

const useStyles = makeStyles((theme) => ({
    card: {
        paddingTop: theme.spacing(2),
    },
}));

export default VaultCard;