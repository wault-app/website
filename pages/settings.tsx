import ColorSchemaSelector from "@components/dashboard/settings/ColorSchemaSelector";
import DarkModeSwitch from "@components/dashboard/settings/DarkModeSwitch";
import ImportDataButton from "@components/dashboard/settings/ImportDataButton";
import VaultCard from "@components/dashboard/vault/VaultCard";
import { List, ListSubheader } from "@material-ui/core";
import { Fragment } from "react";

export type SettingsPageProps = {};

const SettingsPage = () => {
    return (
        <Fragment>
            <VaultCard>
                <List>
                    <ListSubheader>
                        Display settings
                    </ListSubheader>
                    <DarkModeSwitch />
                    <ColorSchemaSelector/>
                </List>
            </VaultCard>
            <VaultCard>
                <List>
                    <ListSubheader>
                        Your data
                    </ListSubheader>
                    <ImportDataButton />
                </List>
            </VaultCard>
        </Fragment>
    );
};

export default SettingsPage;