import Clipboard from "@lib/client/clipboard";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { FileCopyRounded as CopyIcon } from "@material-ui/icons";

export type CopyUsernameButtonProps = {
    username: string;
    onCopy?: (username: string) => void;
};

/**
 * A button used to copy the username of an `Account` to the Clipboard
 * @param password {username} the value of the username
 */
const CopyUsernameButton = ({ username, onCopy }: CopyUsernameButtonProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const copy = async () => {
        try {
            await Clipboard.copy(username);
            enqueueSnackbar("Successfully copied username to clipboard");
            if(onCopy) onCopy(username);
        } catch(e) {
            console.error(e);
            enqueueSnackbar("Failed to copy to clipboard", {
                variant: "error",
            });
        };
    };    

    return (
        <ListItem button onClick={copy}>
            <ListItemIcon>
                <CopyIcon />
            </ListItemIcon>
            <ListItemText>Copy username</ListItemText>
        </ListItem>
    );
};

export default CopyUsernameButton;