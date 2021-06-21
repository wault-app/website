import { useDialog } from "@components/providers/DialogProvider";
import { IssuerType } from "@lib/client/credit-cards/issuers";
import Issuers from "@lib/client/credit-cards/issuers/issuers";
import { ListItem, ListItemAvatar, ListItemText, makeStyles, Theme } from "@material-ui/core";
import { CreditCardRounded } from "@material-ui/icons";
import CreditCardDialog from "./CreditCardDialog";

type CreditCardType = {
    uuid: string;
    name: string;
    issuer: IssuerType;
    endsWith: string;
};

export type CreditCardItemProps = {
    creditCard: CreditCardType;
};

const CreditCardItem = ({ creditCard }: CreditCardItemProps) => {
    const issuer = Issuers.get(creditCard.issuer);
    const classes = useStyles({ color: issuer.color });
    const { open } = useDialog();

    return (
        <ListItem button onClick={() => open(
            <CreditCardDialog uuid={creditCard.uuid} />
        )}>
            <ListItemAvatar>
                <div className={classes.background}>
                    <CreditCardRounded className={classes.icon} />
                </div>
            </ListItemAvatar>
            <ListItemText
                primary={creditCard.name}
                secondary={`${issuer.name} card, ending with: ${creditCard.endsWith}`}
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