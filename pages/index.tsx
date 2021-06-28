import AccountItem from "@components/dashboard/accounts/AccountItem";
import AddItemFAB from "@components/dashboard/landing/AddItemFAB";
import CreditCardItem from "@components/dashboard/cards/CreditCardItem";
import VaultCard from "@components/dashboard/vault/VaultCard";
import { List, ListSubheader } from "@material-ui/core";
import { Fragment } from "react";
import { useKeycards } from "@components/providers/KeycardProvider";
import SafeItem from "@components/dashboard/vault/SafeItem";

const MainPage = () => {
    const { keycards } = useKeycards();
    
    return (
        <Fragment>
            {keycards.map((keycard) => (
                <SafeItem 
                    keycard={keycard}
                />
            ))}
            <AddItemFAB />
        </Fragment>
    );
};

export default MainPage;