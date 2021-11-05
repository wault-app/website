import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tooltip, IconButton, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, Skeleton } from "@mui/material";
import DesktopIcon from "@mui/icons-material/DesktopWindowsRounded";
import LogoutIcon from "@mui/icons-material/ExitToAppRounded"
import BrowserIcon from "@mui/icons-material/LanguageRounded";
import MobileIcon from "@mui/icons-material/SmartphoneRounded";
import Device, { DeviceType } from "@lib/api/Device";
import { Fragment, useState } from "react";
import { useSnackbar } from "notistack";

export type DeviceItemProps = {
    loading: true;
} | {
    device: DeviceType;
    onLogout: (device: DeviceType) => void; 
};

const DeviceItem = (props: DeviceItemProps) => {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    if ("loading" in props) {
        return (
            <ListItem>
                <ListItemIcon>
                    <Skeleton
                        variant={"circular"}
                        width={36}
                        height={36}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={<Skeleton />}
                    secondary={<Skeleton />}
                />
            </ListItem>
        );
    }

    const logout = async () => {
        try {
            setDisabled(true);
            await Device.logout(props.device);
            props.onLogout(props.device);
            setOpen(false);
            enqueueSnackbar("Successfully logged out!", {
                variant: "success",
            });
        } catch(e) {
            enqueueSnackbar(e.message, {
                variant: "error",
            });
        } finally {
            setDisabled(false);
        }
    };

    return (
        <Fragment>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                    Are you sure?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You might lose access by logging out a device remotely! Please check that you have AT LEAST ONE(!) mobile device available to log in before you sign out.
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
                        color={"primary"}
                        disabled={disabled}
                    >
                        Log out
                    </Button>
                </DialogActions>
            </Dialog>
            
            <ListItem>
                <ListItemIcon>
                    {props.device.type === "BROWSER" ? (
                        <BrowserIcon />
                    ) : props.device.type === "MOBILE" ? (
                        <MobileIcon />
                    ) : (
                        <DesktopIcon />
                    )}
                </ListItemIcon>
                <ListItemText
                    primary={props.device.name}
                    secondary={`Logged in at ${new Date(props.device.loggedInAt).toLocaleDateString()}`}
                />
                <ListItemSecondaryAction>
                    <Tooltip title={"Sign this device out"}>
                        <IconButton
                            onClick={() => setOpen(true)}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        </Fragment>
    );
};

export default DeviceItem;