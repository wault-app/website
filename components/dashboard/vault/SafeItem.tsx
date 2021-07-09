import { Collapse, List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import VaultCard from "./VaultCard";
import { Skeleton } from "@material-ui/lab";
import AccountItem from "../accounts/AccountItem";
import { KeycardType } from "@lib/client/api/Safe";
import CreditCardItem from "../cards/CreditCardItem";
import { AutoSizer, List as VirtualizedList } from "react-virtualized";
import Placeholder from "@lib/client/placeholder";
import { TransitionGroup } from "react-transition-group";
import { useSearch } from "../search/SearchProvider";
import Fuse from "fuse.js";
import { useMemo } from "react";

export type SafeItemProps = {
    loading: true;
} | {
    keycard: KeycardType;
};

const SafeItem = (props: SafeItemProps) => {
    const { value } = useSearch();

    const fuse = useMemo(() => {
        const arr = "keycard" in props ? props.keycard.safe.items : [];

        const fuse = new Fuse(arr, {
            keys: [
                "username",
                "platform",
                "categories",
            ],
        });

        return fuse;
    }, [props]);

    const results = useMemo(() => {
        if (value.length > 0) {
            return fuse.search(value).map((item) => item.item);
        } else {
            return "keycard" in props ? props.keycard.safe.items : [];
        }
    }, [value, fuse]);

    if ("loading" in props) {
        return (
            <VaultCard>
                <List>
                    <ListSubheader>
                        <Skeleton />
                    </ListSubheader>
                    {Placeholder.generate(3, 2).map((index) => (
                        <AccountItem
                            key={`account-item-placeholder-${index}`}
                            loading
                        />
                    ))}
                </List>
            </VaultCard>
        );
    }

    return (
        <VaultCard key={`safe-item-${props.keycard.id}`}>
            <List>
                <ListSubheader>
                    {props.keycard.safe.name}
                </ListSubheader>
                <TransitionGroup>
                    {results.map((item) => (
                        <Collapse key={`item-component-${item.id}`}>
                            {
                                item.type === "account" ? (
                                    <AccountItem account={item} key={`account-item-${item.id}`} />
                                ) : item.type === "credit-card" && (
                                    <CreditCardItem creditCard={item} key={`credit-card-item-${item.id}`} />
                                )
                            }
                        </Collapse>
                    )
                    )}
                </TransitionGroup>

                {props.keycard.safe.items.length === 0 && (
                    <ListItem>
                        <ListItemText
                            primary={"This safe is empty"}
                            secondary={"Use the plus in the bottom right corner"}
                        />
                    </ListItem>
                )}
            </List>
        </VaultCard>
    );
};

export default SafeItem;