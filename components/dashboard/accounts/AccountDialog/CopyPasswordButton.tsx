import { VpnKeyRounded as PasswordIcon } from "@material-ui/icons";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const CopyPasswordButton = ({ password }: { password: string }) => (
    <ListItem button>
        <ListItemIcon>
            <PasswordIcon />
        </ListItemIcon>
        <ListItemText>Copy password</ListItemText>
    </ListItem>
);

export default CopyPasswordButton;