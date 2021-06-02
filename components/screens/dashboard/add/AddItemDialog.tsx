import { Grid, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { CreditCardRounded as CreditCardIcon, PersonRounded as AccountItem } from "@material-ui/icons";
import { Fragment, useState } from "react";
import AddAccountScreen from "./AddItemDialog/AddAccountScreen";
import AddCreditCardScreen from "./AddItemDialog/AddCreditCardScreen";

type ScreenType = "account" | "credit-card";

const AddItemDialog = () => {
    const [selected, setSelected] = useState<ScreenType>(null);

    if(!selected) {
        return (
            <List>
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
        );
    }

    return (
        <Fragment>
            {selected === "account" && (
                <AddAccountScreen />
            )}
            {selected === "credit-card" && (
                <AddCreditCardScreen />
            )}
        </Fragment>
    );
};

export default AddItemDialog;