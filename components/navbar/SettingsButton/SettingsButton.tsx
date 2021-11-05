import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import SettingsIcon from "@mui/icons-material/SettingsRounded";

export type SettingsButtonProps = {
    onClick: () => void;
};

const SettingsButton = (props: SettingsButtonProps) => {
    return (
        <ListItem
            button
            {...props}
        >
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText
                primary={"Settings"}
            />
        </ListItem>
    );
};

export default SettingsButton;