import DarkModeIcon from "@mui/icons-material/Brightness2Rounded";
import { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Switch } from "@mui/material";
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