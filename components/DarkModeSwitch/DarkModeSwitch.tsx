import { Brightness2Rounded as DarkModeIcon } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Switch } from "@mui/material";
import { useTheme } from "@components/ThemeProvider";

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