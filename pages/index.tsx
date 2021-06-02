import AccountItem from "@components/screens/dashboard/accounts/AccountItem";
import AddItemFAB from "@components/screens/dashboard/add/AddItemFAB";
import CreditCardItem from "@components/screens/dashboard/cards/CreditCardItem";
import VaultCard from "@components/screens/dashboard/vault/VaultCard";
import { useDialog } from "@components/screens/dialog/DialogProvider";
import { List, ListSubheader } from "@material-ui/core";
import { Fragment } from "react";

const MainPage = () => {
    const { open } = useDialog();

    return (
        <Fragment>
            <AddItemFAB />
        <VaultCard>
            <List>
                <ListSubheader>
                    Test vault
                    </ListSubheader>
                <AccountItem
                    account={{
                        platform: "discord.com",
                        username: "pepyta118@gmail.com",
                        password: "password123",
                        description: "Lorem ipsum dolor",
                        categories: ["work", "social", "games"],
                    }}
                />

                <CreditCardItem
                    creditCard={{
                        uuid: "asdasd123",
                        name: "OTP Junior",
                        endsWith: "1234",
                        issuer: "mastercard"
                    }}
                />

                <CreditCardItem
                    creditCard={{
                        uuid: "asdasd123",
                        name: "OTP Junior",
                        endsWith: "1234",
                        issuer: "amex",
                    }}
                />
            </List>
        </VaultCard>
        <VaultCard>
            <List>
                <ListSubheader>
                    Test vault
                    </ListSubheader>
                <AccountItem
                    account={{
                        platform: "discord.com",
                        username: "pepyta118@gmail.com",
                        password: "password123",
                        description: "Lorem ipsum dolor",
                        categories: ["work", "social", "games"],
                    }}
                />

                <CreditCardItem
                    creditCard={{
                        uuid: "asdasd123",
                        name: "OTP Junior",
                        endsWith: "1234",
                        issuer: "mastercard"
                    }}
                />

                <CreditCardItem
                    creditCard={{
                        uuid: "asdasd123",
                        name: "OTP Junior",
                        endsWith: "1234",
                        issuer: "amex",
                    }}
                />
            </List>
        </VaultCard>
        </Fragment>
    );
};

export default MainPage;