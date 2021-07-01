import { AuthenticationContext } from "@components/providers/AuthenticationProvider";
import Authentication from "@lib/client/api/Authentication";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import { ExitToAppRounded as LogoutIcon } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { Fragment, useContext, useState } from "react";

const LogoutButton = () => {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const { setUser } = useContext(AuthenticationContext);

    const { enqueueSnackbar } = useSnackbar();

    const logout = async () => {
        try {
            await Authentication.logout();
            
            setUser(null);
            
            enqueueSnackbar("Successfully logged out!", {
                variant: "success",
            });
        } catch(e) {
            enqueueSnackbar("Something went wrong!", {
                variant: "error",
            });

            setDisabled(true);
        }
    };

    return (
        <Fragment>
            <ListItem button onClick={() => setOpen(true)}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                    primary={"Log out"}
                />
            </ListItem>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                    Are you sure?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You will have to login again on this device if you want to continue using our service.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={disabled}
                        onClick={() => setOpen(false)}
                    >
                        Close
                    </Button>
                    <Button
                        onClick={logout}
                        disabled={disabled}
                        color={"primary"}
                    >
                        Log out
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default LogoutButton;