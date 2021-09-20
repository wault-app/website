import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useSnackbar } from "notistack";
import { FileCopyRounded as CopyIcon } from "@mui/icons-material";
import Clipboard from "@lib/clipboard";

export type CopyCardNumberButtonProps = {
    number: string;
};

const CopyCardNumberButton = (props: CopyCardNumberButtonProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const copy = async () => {
        try {
            await Clipboard.copy(props.number);
            enqueueSnackbar("Successfully copied card number to clipboard");
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
            <ListItemText>Copy credit card number</ListItemText>
        </ListItem>
    );
};

export default CopyCardNumberButton;