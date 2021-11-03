import { CreditCardType } from "@wault/typings";
import Issuers from "@lib/credit-cards/issuers/issuers";
import { ListItem, ListItemAvatar, ListItemText, useTheme } from "@mui/material";
import { CreditCardRounded } from "@mui/icons-material";
import CreditCardDialog from "../CreditCardDialog/CreditCardDialog";
import Payments from "payment";
import { Fragment, useState } from "react";
import { Box } from "@mui/system";

export type CreditCardItemProps = {
    creditCard: CreditCardType;
};

const CreditCardItem = ({ creditCard }: CreditCardItemProps) => {
    const issuer = Issuers.get(Payments.fns.cardType(creditCard.number));
    const [open, setOpen] = useState(false);
    const theme = useTheme();

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
                <ListItemAvatar sx={{ mr: 1 }}>
                    <Box sx={{
                        background: issuer.color,
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        boxShadow: theme.shadows[2],
                    }}>
                        <CreditCardRounded
                            style={{
                                width: 24,
                                height: 24,
                                margin: 12,
                            }} 
                        />
                    </Box>
                </ListItemAvatar>
                <ListItemText
                    primary={creditCard.name}
                    secondary={issuer.name}
                />
            </ListItem>
        </Fragment>
    );
};

export default CreditCardItem;