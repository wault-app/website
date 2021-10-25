import { ListItem, ListItemAvatar, ListItemText, MenuProps, Skeleton } from "@mui/material";
import PlatformIcon from "@components/PlatformIcon";
import AccountDialog from "../AccountDialog/AccountDialog";
import AccountMenu from "../AccountMenu/AccountMenu";
import { AccountType } from "@wault/typings";
import { memo, useState } from "react";
import { Box } from "@mui/system";

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

    return (
        <Box>
            <AccountDialog
                maxWidth={"md"}
                fullWidth
                account={props.account}
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
                        hostname={props.account.platform}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={props.account.platform}
                    secondary={props.account.username}
                />
            </ListItem>
        </Box>
    );
};

export default memo(AccountItem, (prev, next) => {
    if("loading" in prev) return "loading" in next;
    if("loading" in next) return false;
    return prev.account.id === next.account.id; 
});