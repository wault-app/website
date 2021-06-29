import { List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import VaultCard from "./VaultCard";
import { Skeleton } from "@material-ui/lab";
import AccountItem from "../accounts/AccountItem";
import { KeycardType } from "@lib/client/api/Safe";

export type SafeItemProps = {
    loading: true;
} | {
    keycard: KeycardType;
};

const SafeItem = (props: SafeItemProps) => {
    if("loading" in props) {
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
                {props.keycard.safe.items.map((item) => (
                    item.type === "account" ? (
                        <AccountItem account={item} />
                    ) : (
                        <div />
                    )
                ))}
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