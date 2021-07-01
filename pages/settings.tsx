import ColorSchemaSelector from "@components/dashboard/settings/ColorSchemaSelector";
import DarkModeSwitch from "@components/dashboard/settings/DarkModeSwitch";
import VaultCard from "@components/dashboard/vault/VaultCard";
import { List, ListSubheader } from "@material-ui/core";

export type SettingsPageProps = {};

const SettingsPage = () => {
    return (
        <VaultCard>
            <List>
                <ListSubheader>
                    Display settings
                </ListSubheader>
                <DarkModeSwitch />
                <ColorSchemaSelector/>
            </List>
        </VaultCard>
    );
};

export default SettingsPage;