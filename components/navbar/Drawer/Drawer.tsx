import UserComponent from "@components/navbar/UserComponent/UserComponent";
import { Divider, DrawerProps as MUIDrawerProps, List } from "@mui/material";
import { Box } from "@mui/system";
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

    const navigate = (target: string) => {
        router.push(target);
        props.close();
    };

    return (
        <Fragment>
            <Box sx={{ p: 2, mt: 1 }}>
                <UserComponent />
            </Box>    
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