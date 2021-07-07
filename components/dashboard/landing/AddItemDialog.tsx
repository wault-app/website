import SafeIcon from "@components/icons/SafeIcon";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Grid, Icon, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import { CreditCardRounded as CreditCardIcon, PersonRounded as AccountItem } from "@material-ui/icons";
import { Fragment, useState } from "react";
import AddAccountDialog from "./AddItemDialog/AddAccountDialog";
import AddCreditCardDialog from "./AddItemDialog/AddCreditCardScreen";
import AddSafeDialog from "./AddItemDialog/AddSafeDialog";
import { useKeycards } from "@components/providers/KeycardProvider";

type ScreenType = "account" | "credit-card" | "safe";

export type AddItemDialogProps = DialogProps;

const AddItemDialog = (props: AddItemDialogProps) => {
    const classes = useStyles();
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
                <DialogContent className={classes.root}>
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

const useStyles = makeStyles({
    root: {
        padding: 0,
        paddingTop: "0 !important",
    },
});

export default AddItemDialog;