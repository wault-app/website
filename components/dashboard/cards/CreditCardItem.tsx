import { CreditCardType } from "@wault/typings";
import Issuers from "@lib/credit-cards/issuers/issuers";
import { ListItem, ListItemAvatar, ListItemText, makeStyles, Theme } from "@material-ui/core";
import { CreditCardRounded } from "@material-ui/icons";
import CreditCardDialog from "./CreditCardDialog";
import Payments from "payment";
import { Fragment, useState } from "react";

export type CreditCardItemProps = {
    creditCard: CreditCardType;
};

const CreditCardItem = ({ creditCard }: CreditCardItemProps) => {
    const issuer = Issuers.get(Payments.fns.cardType(creditCard.number));
    const classes = useStyles({ color: issuer.color });
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <CreditCardDialog
                creditCard={creditCard}
                open={open}
                maxWidth={"md"}
                fullWidth
                onClose={() => setOpen(false)}
            />
            <ListItem button onClick={() => setOpen(true)}>
                <ListItemAvatar>
                    <div className={classes.background}>
                        <CreditCardRounded className={classes.icon} />
                    </div>
                </ListItemAvatar>
                <ListItemText
                    primary={creditCard.name}
                    secondary={issuer.name}
                />
            </ListItem>
        </Fragment>
    );
};

const useStyles = makeStyles<Theme, { color: string }>((theme) => ({
    background: {
        background: props => props.color,
        width: 48,
        height: 48,
        borderRadius: 12,
        marginRight: 16,
    },
    icon: {
        width: 24,
        height: 24,
        margin: 12,
    },
}));

export default CreditCardItem;