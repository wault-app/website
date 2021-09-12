import { CreditCardType } from "@wault/typings";
import { Button, Dialog, DialogContent, DialogActions, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, DialogProps } from "@material-ui/core";
import { VisibilityOffRounded as HideIcon, VisibilityRounded as ShowIcon } from "@material-ui/icons";
import { useState } from "react";
import ReactCreditCard from "react-credit-cards";
import CopyCardNumberButton from "../CopyCardNumberButton";

export type CreditCardDialogProps = DialogProps & {
    creditCard: CreditCardType;
};

const CreditCardDialog = (props: CreditCardDialogProps) => {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const { creditCard } = props;

    return (
        <Dialog {...props}>
            <DialogContent className={classes.root}>
                <Grid container>
                    <Grid item xs={12} md={5}>
                        <div className={classes.card}>
                            <ReactCreditCard
                                name={creditCard.cardholder}
                                cvc={creditCard.cvc}
                                number={creditCard.number}
                                expiry={creditCard.expiry}
                                focused={show ? "cvc" : null}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <List>
                            <ListItem button onClick={() => setShow(!show)}>
                                <ListItemIcon>
                                    {!show ? (
                                        <ShowIcon />
                                    ) : (
                                        <HideIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={!show ? "Show CVC / CVV" : "Hide CVC / CVV"}
                                />
                            </ListItem>
                            {creditCard.number && (
                                <CopyCardNumberButton number={creditCard.number} />
                            )}
                        </List>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => props.onClose({}, "backdropClick")}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 300,
        padding: 0,
        paddingTop: "0 !important",
    },
    card: {
        width: "100%",
        padding: theme.spacing(4),
    }
}));

export default CreditCardDialog;