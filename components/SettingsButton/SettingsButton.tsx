import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { SettingsRounded as SettingsIcon } from "@material-ui/icons";

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