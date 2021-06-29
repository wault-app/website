import { useDialog } from "@components/providers/DialogProvider";
import { CreditCardType } from "@lib/client/api/Item";
import Issuers from "@lib/client/credit-cards/issuers/issuers";
import { ListItem, ListItemAvatar, ListItemText, makeStyles, Theme } from "@material-ui/core";
import { CreditCardRounded } from "@material-ui/icons";
import CreditCardDialog from "./CreditCardDialog";
import Payments from "payment";

export type CreditCardItemProps = {
    creditCard: CreditCardType;
};

const CreditCardItem = ({ creditCard }: CreditCardItemProps) => {
    const issuer = Issuers.get(Payments.fns.cardType(creditCard.number));
    const classes = useStyles({ color: issuer.color });
    const { open } = useDialog();

    return (
        <ListItem button onClick={() => open(
            <CreditCardDialog creditCard={creditCard} />
        )}>
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