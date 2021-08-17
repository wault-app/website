import UserComponent from "@components/user/UserComponent";
import { Divider, DrawerProps as MUIDrawerProps, List } from "@material-ui/core";
import { useRouter } from "next/router";
import { Fragment } from "react";
import HomeButton from "./HomeButton/HomeButton";
import LogoutButton from "./LogoutButton";
import SettingsButton from "./SettingsButton";

export type DrawerProps = {
    close: () => void;
} & MUIDrawerProps;

const Drawer = (props: DrawerProps) => {
    const router = useRouter();

    const navigate = (target: string) => {
        router.push(target);
        props.close();
    };

    return (
        <Fragment>
            <UserComponent />
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

export default Drawer;