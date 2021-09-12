import DeviceList from "@components/DeviceList";
import ColorSchemaSelector from "@components/ColorSchemaSelector";
import DarkModeSwitch from "@components/DarkModeSwitch";
import ExportDataButton from "@components/ExportDataButton";
import ImportDataButton from "@components/ImportDataButton";
import ResponsiveCard from "@components/ResponsiveCard";
import { List, ListSubheader } from "@material-ui/core";
import { Fragment } from "react";

export type SettingsPageProps = {};

const SettingsPage = () => {
    return (
        <Fragment>
            <ResponsiveCard>
                <List>
                    <ListSubheader>
                        Display settings
                    </ListSubheader>
                    <DarkModeSwitch />
                    <ColorSchemaSelector/>
                </List>
            </ResponsiveCard>
            <ResponsiveCard>
                <List>
                    <ListSubheader>
                        Your data
                    </ListSubheader>
                    <ImportDataButton />
                    <ExportDataButton />
                </List>
            </ResponsiveCard>
            <ResponsiveCard>
                <List>
                    <ListSubheader>
                        Devices
                    </ListSubheader>
                    <DeviceList />
                </List>
            </ResponsiveCard>
        </Fragment>
    );
};

export default SettingsPage;