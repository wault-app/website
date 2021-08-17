import DeviceList from "@components/dashboard/devices/DeviceList";
import ColorSchemaSelector from "@components/dashboard/settings/ColorSchemaSelector";
import DarkModeSwitch from "@components/dashboard/settings/DarkModeSwitch";
import ExportDataButton from "@components/dashboard/settings/ExportDataButton";
import ImportDataButton from "@components/dashboard/settings/ImportDataButton";
import ResponsiveCard from "@components/common/ResponsiveCard";
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