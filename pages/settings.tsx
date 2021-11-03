import DeviceList from "@components/settings/DeviceList";
import ColorSchemaSelector from "@components/settings/ColorSchemaSelector";
import DarkModeSwitch from "@components/settings/DarkModeSwitch";
import ExportDataButton from "@components/settings/ExportDataButton";
import ImportDataButton from "@components/settings/ImportDataButton";
import { Card, Container, Grid, List, ListSubheader } from "@mui/material";

export type SettingsPageProps = {};

const categories = [
    {
        title: "Display settings",
        items: [
            <DarkModeSwitch key={"dark-mode-switch"} />,
            <ColorSchemaSelector key={"color-schema-selector"} />,
        ],
    },
    {
        title: "Your data",
        items: [
            <ImportDataButton key={"import-data-button"} />,
            <ExportDataButton key={"export-data-button"} />
        ],
    },
    {
        title: "Devices",
        items: [
            <DeviceList key={"device-list"} />
        ],
    }
];

const SettingsPage = () => {
    return (
        <Container maxWidth={"sm"} sx={{ pt: 2, pb: 2 }}>
            <Grid container spacing={2}>
                {categories.map((category) => (
                    <Grid item xs={12} key={`category-${category.title}`}>
                        <Card>
                            <List>
                                <ListSubheader>
                                    {category.title}
                                </ListSubheader>
                                {category.items}
                            </List>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default SettingsPage;