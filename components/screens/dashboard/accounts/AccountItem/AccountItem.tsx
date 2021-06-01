import { ListItem, ListItemAvatar, ListItemText, makeStyles } from "@material-ui/core";
import PlatformIcon from "../../platforms/PlatformIcon";
import { useDialog } from "@components/screens/dialog/DialogProvider/DialogProvider";
import AccountDialog from "../AccountDialog";
import { Fragment, useState } from "react";
import AccountMenu from "../AccountMenu";
import { CategoryType } from "@lib/client/categories";
import { useMenu } from "@components/screens/menu/MenuProvider";

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
    const { setOpen, setComponent } = useDialog();
    const { open: openMenu } = useMenu();
    const classes = useStyles();

    if ("loading" in props) {
        return <div />
    }

    const { account } = props;

    const open = () => {
        setComponent(
            <AccountDialog
                {...account}
            />
        );

        setOpen(true);
    };

    return (
        <Fragment>
            <ListItem
                button
                onClick={() => open()}
                onContextMenu={(e) => {
                    e.preventDefault();
                    openMenu(
                        <AccountMenu
                            account={account}
                        />,
                        e.currentTarget
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