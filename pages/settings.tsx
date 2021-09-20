import DeviceList from "@components/DeviceList";
import ColorSchemaSelector from "@components/ColorSchemaSelector";
import DarkModeSwitch from "@components/DarkModeSwitch";
import ExportDataButton from "@components/ExportDataButton";
import ImportDataButton from "@components/ImportDataButton";
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