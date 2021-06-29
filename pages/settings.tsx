import VaultCard from "@components/dashboard/vault/VaultCard";
import { useTheme } from "@components/providers/DarkModeProvider";
import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, Switch } from "@material-ui/core";
import { Brightness2Rounded as DarkModeIcon } from "@material-ui/icons";

export type SettingsPageProps = {};

const SettingsPage = () => {
    const { theme, setTheme } = useTheme();

    return (
        <VaultCard>
            <List>
                <ListSubheader>
                    Display settings
                </ListSubheader>
                <ListItem>
                    <ListItemIcon>
                        <DarkModeIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Dark mode"} />
                    <ListItemSecondaryAction>
                        <Switch
                            edge="end"
                            checked={theme === "dark"}
                            onChange={(e, checked) => setTheme(checked ? "dark" : "light")}
                            color={"primary"}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </VaultCard>
    );
};

export default SettingsPage;