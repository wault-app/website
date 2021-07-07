import { List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import VaultCard from "./VaultCard";
import { Skeleton } from "@material-ui/lab";
import AccountItem from "../accounts/AccountItem";
import { KeycardType } from "@lib/client/api/Safe";
import CreditCardItem from "../cards/CreditCardItem";
import { AutoSizer, List as VirtualizedList } from "react-virtualized";

export type SafeItemProps = {
    loading: true;
} | {
    keycard: KeycardType;
};

const SafeItem = (props: SafeItemProps) => {
    if ("loading" in props) {
        return (
            <VaultCard>
                <List>
                    <ListSubheader>
                        <Skeleton />
                    </ListSubheader>
                    {[0, 0, 0].map(() => (
                        <AccountItem loading />
                    ))}
                </List>
            </VaultCard>
        );
    }

    return (
        <VaultCard>
            <List>
                <ListSubheader>
                    {props.keycard.safe.name}
                </ListSubheader>
                {props.keycard.safe.items.length > 0 ? (
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <VirtualizedList
                                ref={`virtualized-vault-list-${props.keycard.safe.id}`}
                                height={props.keycard.safe.items.length * 72}
                                overscanRowCount={10}
                                rowCount={props.keycard.safe.items.length}
                                rowHeight={72}
                                rowRenderer={({ index }) => {
                                    const item = props.keycard.safe.items[index];

                                    return (
                                        item.type === "account" ? (
                                            <AccountItem account={item} />
                                        ) : item.type === "credit-card" ? (
                                            <CreditCardItem creditCard={item} />
                                        ) : (
                                            <div />
                                        )
                                    )
                                }}
                                width={width}
                            />
                        )}
                    </AutoSizer>
                ) : (
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