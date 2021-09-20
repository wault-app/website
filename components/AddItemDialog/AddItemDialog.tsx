import SafeIcon from "@components/SafeIcon";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { CreditCardRounded as CreditCardIcon, PersonRounded as AccountItem } from "@mui/icons-material";
import { Fragment, useState } from "react";
import AddAccountDialog from "../AddAccountDialog";
import AddCreditCardDialog from "../AddCreditCardDialog";
import AddSafeDialog from "@components/AddSafeDialog";
import { useKeycards } from "@components/KeycardProvider";

type ScreenType = "account" | "credit-card" | "safe";

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
                                <AccountItem />
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
            {selected === "safe" && (
                <AddSafeDialog {...props} onClose={close} onBack={back} />
            )}
            {selected === "account" && (
                <AddAccountDialog {...props} onClose={close} onBack={back} />
            )}
            {selected === "credit-card" && (
                <AddCreditCardDialog {...props} onClose={close} onBack={back} />
            )}
        </Fragment>
    );
};

export default AddItemDialog;