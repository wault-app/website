import { AppBar, Drawer, Hidden, IconButton, makeStyles, Toolbar, } from "@material-ui/core";
import { MenuRounded as MenuIcon } from "@material-ui/icons";
import { Fragment, PropsWithChildren, useState } from "react";
import DrawerContent from "./Drawer";

export type NavigationBarProps = PropsWithChildren<{}>;

const NavigationBar = (props: NavigationBarProps) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <Hidden smDown>
                <Drawer
                    variant={"permanent"}
                    classes={{
                      paper: classes.drawer,
                    }}
                    open
                >
                    <DrawerContent 
                        close={() => setOpen(false)}
                    />
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
                    <DrawerContent
                        close={() => setOpen(false)}
                    />
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