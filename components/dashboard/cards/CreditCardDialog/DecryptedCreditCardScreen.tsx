import { Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import { Visibility, VisibilityOffRounded as HideIcon, VisibilityRounded as ShowIcon } from "@material-ui/icons";
import { useState } from "react";
import ReactCreditCard from "react-credit-cards";
import { CreditCardType } from "../CreditCardDialog";

export type DecryptedCreditCardScreenProps = {
    creditCard: CreditCardType;
};

const DecryptedCreditCardScreen = ({ creditCard }: DecryptedCreditCardScreenProps) => {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12} md={5}>
                <div className={classes.card}>
                    <ReactCreditCard
                        name={creditCard.cardHolder}
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
                </List>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 300,
    },
    card: {
        padding: theme.spacing(4),
        width: "100%",
    }
}));

export default DecryptedCreditCardScreen;