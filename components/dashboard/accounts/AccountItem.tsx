import { ListItem, ListItemAvatar, ListItemText, makeStyles, MenuProps } from "@material-ui/core";
import PlatformIcon from "@components/platforms/PlatformIcon";
import AccountDialog from "./AccountDialog";
import { Fragment  } from "react";
import AccountMenu from "./AccountMenu";
import { Skeleton } from "@material-ui/lab";
import { AccountType } from "@lib/client/api/Item";
import { useState } from "react";

type AccountItemLoadedProps = {
    account: AccountType;
};

export type AccountItemProps = AccountItemLoadedProps | {
    loading: true;
};

const AccountItem = (props: AccountItemProps) => {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState<MenuProps>();

    const classes = useStyles();

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
        <Fragment>
            <AccountDialog
                maxWidth={"md"}
                fullWidth
                account={account}
                open={open}
                onClose={() => setOpen(false)}
            />
            <AccountMenu
                {...state}
                onClose={() => setState({ ...state, open: false })}
                account={props.account}
            />
            <ListItem
                button
                onClick={() => {
                    setOpen(true);
                }}
                onContextMenu={(event) => {
                    event.preventDefault();
                    setState({
                        open: true,
                        anchorReference: "anchorPosition",
                        anchorPosition: {
                            left: event.clientX,
                            top: event.clientY,
                        },
                    });
                }}
            >
                <ListItemAvatar>
                    <PlatformIcon
                        size={48}
                        hostname={account.platform}
                        className={classes.icon}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={account.platform}
                    secondary={account.username}
                />
            </ListItem>
        </Fragment>
    );
};

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
}));

export default AccountItem;