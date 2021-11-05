import SafeIcon from "@components/icons/SafeIcon";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCardRounded";
import AccountIcon from "@mui/icons-material/PersonRounded"; 
import { Fragment, useState } from "react";
import AddAccountDialog from "@components/account/AddAccountDialog";
import AddCreditCardDialog from "@components/credit-card/AddCreditCardDialog";
import AddSafeDialog from "@components/safe/AddSafeDialog";
import AddEthereumWalletDialog from "@components/crypto/AddEthereumWalletDialog";
import { useKeycards } from "@components/providers/KeycardProvider";
import EthereumIcon from "@components/icons/EthereumIcon";

type ScreenType = "account" | "credit-card" | "safe" | "ethereum";

export type AddItemDialogProps = DialogProps;

const AddItemDialog = (props: AddItemDialogProps) => {
    const [selected, setSelected] = useState<ScreenType>(null);
    const { keycards } = useKeycards();

    // check if there is at least one keycard with not reader role
    const isAvailable = keycards.filter((keycard) => ["OWNER", "WRITER"].includes(keycard.role)).length > 0;

    const close = () => {
        props.onClose({}, "backdropClick");
        back();
    };

    const back = () => setSelected(null);

    if(!selected) {
        return (
            <Dialog {...props}>
                <DialogTitle>
                    Select what do you want to add!
                </DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    <List>
                        <ListItem
                            button
                            onClick={() => setSelected("safe")}
                        >
                            <ListItemIcon>
                                <SafeIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Safe"}
                            />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => setSelected("account")}
                            disabled={!isAvailable}
                        >
                            <ListItemIcon>
                                <AccountIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Account"}
                            />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => setSelected("credit-card")}
                            disabled={!isAvailable}
                        >
                            <ListItemIcon>
                                <CreditCardIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Credit card"}
                            />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => setSelected("ethereum")}
                            disabled={!isAvailable}
                        >
                            <ListItemIcon>
                                <EthereumIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Ethereum wallet"}
                            />
                        </ListItem>
                    </List>
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
    }

    return (
        <Fragment>
            {selected === "safe" ? (
                <AddSafeDialog {...props} onClose={close} onBack={back} />
            ) : selected === "account" ? (
                <AddAccountDialog {...props} onClose={close} onBack={back} />
            ) : selected === "credit-card" ? (
                <AddCreditCardDialog {...props} onClose={close} onBack={back} />
            ) : selected === "ethereum" && (
                <AddEthereumWalletDialog {...props} onClose={close} onBack={back} />
            )}
        </Fragment>
    );
};

export default AddItemDialog;