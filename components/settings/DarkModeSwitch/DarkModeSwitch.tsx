import { Brightness2Rounded as DarkModeIcon } from "@material-ui/icons";
import { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Switch } from "@material-ui/core";
import { useTheme } from "@components/providers/ThemeProvider";

export type DarkModeSwitch = {};

const DarkModeSwitch = () => {
    const { darkMode, setDarkMode } = useTheme();

    return (
        <ListItem>
            <ListItemIcon>
                <DarkModeIcon />
            </ListItemIcon>
            <ListItemText primary={"Dark mode"} />
            <ListItemSecondaryAction>
                <Switch
                    edge="end"
                    checked={darkMode}
                    onChange={(e, checked) => setDarkMode(checked)}
                    color={"primary"}
                />
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default DarkModeSwitch;