import { VpnKeyRounded as PasswordIcon } from "@material-ui/icons";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Clipboard from "@lib/client/clipboard";
import { useSnackbar } from "notistack";

export type CopyPasswordButtonProps = {
    password: string;
    onCopy?: (password: string) => void;
};

/**
 * A button used to copy the password of an `Account` to the Clipboard
 * @param password {string} the value of the password
 */
const CopyPasswordButton = ({ password, onCopy }: CopyPasswordButtonProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const copy = async () => {
        try {
            await Clipboard.copy(password);
            enqueueSnackbar("Successfully copied password to clipboard");
            if(onCopy) onCopy(password);
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