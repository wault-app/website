import { AppBar, Box, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, } from "@material-ui/core";
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

    return (
        <Box>
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
        </Box>
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
}));

export default NavigationBar;