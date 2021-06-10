import { VpnKeyRounded as PasswordIcon } from "@material-ui/icons";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Clipboard from "@lib/client/clipboard";
import { useSnackbar } from "notistack";

const CopyPasswordButton = ({ password }: { password: string }) => {
    const { enqueueSnackbar } = useSnackbar();

    const copy = async () => {
        try {
            await Clipboard.copy(password);
            enqueueSnackbar("Successfully copied password to clipboard");
        } catch (e) {
            console.error(e);
            enqueueSnackbar("Failed to copy to clipboard", {
                variant: "error",
            });
        };
    };

    return (
        <ListItem button onClick={() => copy()}>
            <ListItemIcon>
                <PasswordIcon />
            </ListItemIcon>
            <ListItemText>Copy password</ListItemText>
        </ListItem>
    );
}

export default CopyPasswordButton;