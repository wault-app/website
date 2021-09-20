import { AppBar, Drawer, Hidden, IconButton, Toolbar, } from "@mui/material";
import { MenuRounded as MenuIcon } from "@mui/icons-material";
import { Fragment, PropsWithChildren, useState } from "react";
import DrawerContent from "../Drawer";
import { Box } from "@mui/system";

export type NavigationBarProps = PropsWithChildren<{}>;

const DRAWER_WIDTH = 300;

const NavigationBar = (props: NavigationBarProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <Hidden smDown>
                <Drawer
                    variant={"permanent"}
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                    }}
                    open
                >
                    <DrawerContent
                        close={() => setOpen(false)}
                    />
                </Drawer>
            </Hidden>
            <Hidden smUp>
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
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                    }}
                >
                    <DrawerContent
                        close={() => setOpen(false)}
                    />
                </Drawer>
            </Hidden>
            <Box sx={{
                marginLeft: {
                    xs: 0,
                    sm: `${DRAWER_WIDTH}px`,
                },
                marginTop: {
                    xs: "56px",
                    sm: 0,
                },
            }}>
                {props.children}
            </Box>
        </Fragment>
    );
};

export default NavigationBar;