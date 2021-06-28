import { ListItem, ListItemAvatar, ListItemText, makeStyles } from "@material-ui/core";
import PlatformIcon from "@components/platforms/PlatformIcon";
import { useDialog } from "@components/providers/DialogProvider";
import AccountDialog from "./AccountDialog";
import { Fragment  } from "react";
import AccountMenu from "./AccountMenu";
import { CategoryType } from "@lib/client/categories";
import { useMenu } from "@components/providers/MenuProvider";
import { Skeleton } from "@material-ui/lab";

export type AccountType = {
    platform: string;
    categories: CategoryType[];
    username?: string;
    password?: string;
    description?: string;
};

type AccountItemLoadedProps = {
    account: AccountType;
};

export type AccountItemProps = AccountItemLoadedProps | {
    loading: true;
};

const AccountItem = (props: AccountItemProps) => {
    const { open } = useDialog();
    const { open: openMenu } = useMenu();
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
            <ListItem
                button
                onClick={() => open(
                    <AccountDialog
                        {...account}
                    />
                )}
                onContextMenu={(e) => {
                    e.preventDefault();
                    openMenu(
                        <AccountMenu
                            account={account}
                        />,
                        e
                    );
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