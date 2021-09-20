import { ListItem, ListItemAvatar, ListItemText, MenuProps, Skeleton } from "@mui/material";
import PlatformIcon from "@components/PlatformIcon";
import AccountDialog from "../AccountDialog/AccountDialog";
import AccountMenu from "../AccountMenu/AccountMenu";
import { AccountType } from "@wault/typings";
import { useState } from "react";

type AccountItemLoadedProps = {
    account: AccountType;
};

export type AccountItemProps = AccountItemLoadedProps | {
    loading: true;
};

const AccountItem = (props: AccountItemProps) => {
    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState<MenuProps>();

    if ("loading" in props) {
        return (
            <ListItem>
                <ListItemAvatar>
                    <PlatformIcon
                        size={48}
                        loading
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={<Skeleton />}
                    secondary={<Skeleton />}
                />
            </ListItem>
        );
    }

    const { account } = props;

    return (
        <div key={`account-item-${props.account.id}`}>
            <AccountDialog
                maxWidth={"md"}
                fullWidth
                account={account}
                open={open}
                onClose={() => setOpen(false)}
            />
            <AccountMenu
                {...menu}
                onClose={() => setMenu({ ...menu, open: false })}
                account={props.account}
            />
            <ListItem
                button
                onClick={() => {
                    setOpen(true);
                }}
                onContextMenu={(event) => {
                    event.preventDefault();
                    setMenu({
                        open: true,
                        anchorReference: "anchorPosition",
                        anchorPosition: {
                            left: event.clientX,
                            top: event.clientY,
                        },
                    });
                }}
            >
                <ListItemAvatar sx={{ mr: 1 }}>
                    <PlatformIcon
                        size={48}
                        hostname={account.platform}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={account.platform}
                    secondary={account.username}
                />
            </ListItem>
        </div>
    );
};

export default AccountItem;