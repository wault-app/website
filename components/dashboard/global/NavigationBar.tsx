import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, } from "@material-ui/core";
import { ExitToAppRounded as LogoutIcon, HomeRounded as HomeIcon, MenuRounded as MenuIcon } from "@material-ui/icons";
import { Fragment, PropsWithChildren, useState } from "react";
import Image from "next/image";

export type NavigationBarProps = PropsWithChildren<{

}>;

const NavigationBar = (props: NavigationBarProps) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const drawer = (
        <Fragment>
            <List>
                <ListItem button>
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
                <ListItem button>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={"Log out"}
                    />
                </ListItem>
            </List>
        </Fragment>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar color={"default"} className={classes.responsiveHide}>
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

            <Box
                component="nav"
                sx={{
                    width: {
                        md: DRAWER_WIDTH
                    },
                    flexShrink: {
                        md: 0
                    }
                }}
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={open}
                    onClose={() => setOpen(false)}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {
                            xs: "block",
                            md: "none"
                        },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: DRAWER_WIDTH
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "none", md: "block" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <div className={classes.wrapper}>
                    {props.children}
                </div>
            </Box>
        </Box>
    );
};

const DRAWER_WIDTH = 300;

const useStyles = makeStyles((theme) => ({
    responsiveHide: {
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    wrapper: {
        [theme.breakpoints.down("md")]: {
            paddingTop: 64,
        },
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
    },
}));

export default NavigationBar;