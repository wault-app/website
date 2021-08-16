import { Card, Container, makeStyles } from "@material-ui/core";
import { PropsWithChildren } from "react";

export type VaultCardProps = PropsWithChildren<{}>;

const VaultCard = (props: VaultCardProps) => {
    const classes = useStyles();

    return (
        <Container
            className={classes.container}
            maxWidth={"sm"}
        >
            <Card className={classes.card}>
                {props.children}
            </Card>
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: 0,
            marginRight: 0,
            maxWidth: "100%",
            width: "100%",
        },
    },
    card: {
        [theme.breakpoints.down("sm")]: {
            border: "none",
            background: "transparent",
        },
    },
}));

export default VaultCard;