import UserComponent from "@components/UserComponent/UserComponent";
import { Divider, DrawerProps as MUIDrawerProps, List, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import { Fragment } from "react";
import HomeButton from "../HomeButton";
import LogoutButton from "../LogoutButton";
import SettingsButton from "../SettingsButton";

export type DrawerProps = {
    close: () => void;
} & MUIDrawerProps;

const Drawer = (props: DrawerProps) => {
    const router = useRouter();
    const classes = useStyles();

    const navigate = (target: string) => {
        router.push(target);
        props.close();
    };

    return (
        <Fragment>
            <UserComponent className={classes.user} />
            <List>
                <HomeButton onClick={() => navigate("/")} />
            </List>
            <Divider />
            <List>
                <SettingsButton onClick={() => navigate("/settings")} />
                <LogoutButton />
            </List>
        </Fragment>
    );
};

const useStyles = makeStyles(() => ({
    user: {
        padding: 16,
    },
}));

export default Drawer;