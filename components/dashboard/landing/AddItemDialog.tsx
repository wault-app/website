import { DialogFooter } from "@components/DialogProvider";
import SafeIcon from "@components/icons/SafeIcon";
import { DialogContent, DialogTitle, Grid, Icon, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import { CreditCardRounded as CreditCardIcon, PersonRounded as AccountItem } from "@material-ui/icons";
import { Fragment, useState } from "react";
import AddAccountScreen from "./AddItemDialog/AddAccountScreen";
import AddCreditCardScreen from "./AddItemDialog/AddCreditCardScreen";
import AddSafeScreen from "./AddItemDialog/AddSafeScreen";

type ScreenType = "account" | "credit-card" | "safe";

const AddItemDialog = () => {
    const classes = useStyles();
    const [selected, setSelected] = useState<ScreenType>(null);

    if(!selected) {
        return (
            <Fragment>
                <DialogTitle>
                    Select what do you want to add!
                </DialogTitle>
                <DialogContent className={classes.root}>
                    <List>
                        <ListItem button onClick={() => setSelected("safe")}>
                            <ListItemIcon>
                                <SafeIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Safe"}
                            />
                        </ListItem>
                        <ListItem button onClick={() => setSelected("account")}>
                            <ListItemIcon>
                                <AccountItem />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Account"}
                            />
                        </ListItem>
                        <ListItem button onClick={() => setSelected("credit-card")}>
                            <ListItemIcon>
                                <CreditCardIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Credit card"}
                            />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogFooter />
            </Fragment>
        );
    }

    return (
        <Fragment>
            {selected === "safe" && (
                <AddSafeScreen />
            )}
            {selected === "account" && (
                <AddAccountScreen />
            )}
            {selected === "credit-card" && (
                <AddCreditCardScreen />
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