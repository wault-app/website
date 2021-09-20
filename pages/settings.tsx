import DeviceList from "@components/DeviceList";
import ColorSchemaSelector from "@components/ColorSchemaSelector";
import DarkModeSwitch from "@components/DarkModeSwitch";
import ExportDataButton from "@components/ExportDataButton";
import ImportDataButton from "@components/ImportDataButton";
import { Card, Container, Grid, List, ListSubheader } from "@mui/material";

export type SettingsPageProps = {};

// todo: move options to an array for cleaner code
const SettingsPage = () => {
    return (
        <Container maxWidth={"sm"} sx={{ pt: 2, pb: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <List>
                            <ListSubheader>
                                Display settings
                            </ListSubheader>
                            <DarkModeSwitch />
                            <ColorSchemaSelector />
                        </List>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <List>
                            <ListSubheader>
                                Your data
                            </ListSubheader>
                            <ImportDataButton />
                            <ExportDataButton />
                        </List>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <List>
                            <ListSubheader>
                                Devices
                            </ListSubheader>
                            <DeviceList />
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SettingsPage;