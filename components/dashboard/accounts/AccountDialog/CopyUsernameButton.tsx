import Clipboard from "@lib/client/clipboard";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { FileCopyRounded as CopyIcon } from "@material-ui/icons";

const CopyUsernameButton = ({ username }: { username: string }) => {
    const { enqueueSnackbar } = useSnackbar();

    const copy = async () => {
        try {
            await Clipboard.copy(username);
            enqueueSnackbar("Successfully copied username to clipboard");
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