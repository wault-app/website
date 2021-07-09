import { AppBar, Box, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, } from "@material-ui/core";
import { ExitToAppRounded as LogoutIcon, HomeRounded as HomeIcon, MenuRounded as MenuIcon, Router, SettingsRounded as SettingsIcon } from "@material-ui/icons";
import { Fragment, PropsWithChildren, useState } from "react";
import { useRouter } from "next/router";
import Logo from "@components/branding/Logo";
import LogoutButton from "./NavigationBar/LogoutButton";

export type NavigationBarProps = PropsWithChildren<{

}>;

const NavigationBar = (props: NavigationBarProps) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const navigate = (target: string) => {
        router.push(target);
        setOpen(false);
    };

    const drawer = (
        <Fragment>
            <Logo className={classes.logo} />
            <List>
                <ListItem button onClick={() => navigate("/")}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={"Home"}
                    />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={() => navigate("/settings")}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={"Settings"}
                    />
                </ListItem>
                <LogoutButton />
            </List>
        </Fragment>
    );

    return (
        <Fragment>
            <Hidden smDown>
                <Drawer
                    variant="permanent"
                    classes={{
                      paper: classes.drawer,
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden mdUp>
                <AppBar color={"default"}>
                    <Toolbar>
                        <IconButton
                            onClick={() => setOpen(true)}
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Drawer
                    variant={"temporary"}
                    open={open}
                    onClose={() => setOpen(false)}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    classes={{
                      paper: classes.drawer,
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <div className={classes.wrapper}>
                {props.children}
            </div>
        </Fragment>
    );
};

const DRAWER_WIDTH = 300;

const useStyles = makeStyles((theme) => ({
    wrapper: {
        marginLeft: DRAWER_WIDTH,
        [theme.breakpoints.down("sm")]: {
            paddingTop: 64,
            marginLeft: 0,
        },
    },
    drawer: {
        width: DRAWER_WIDTH,
        [theme.breakpoints.up("md")]: {
            flexShrink: 0,
        },
    },
    logo: {
        margin: theme.spacing(4),
        width: 200,
        marginLeft: "auto",
        marginRight: "auto",
    },
}));

export default NavigationBar;