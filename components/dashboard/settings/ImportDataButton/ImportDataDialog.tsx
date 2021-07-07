import PlatformIcon from "@components/platforms/PlatformIcon";
import { Dialog, DialogProps, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useState } from "react";
import Platforms from "@lib/client/platforms";
import LastPass from "@lib/client/import/LastPass";
import ImportDataScreen from "./ImportDataScreen";

export type ImportDataDialogProps = DialogProps & {};

const providers = [
    {
        ...Platforms.get("lastpass.com"),
        converter: LastPass,
    },
];

export type ProviderImportType = (typeof providers)[0];

const ImportDataDialog = (props: ImportDataDialogProps) => {
    const [provider, setProvider] = useState<ProviderImportType>();

    const ProviderList = () => (
        <List>
            {providers.map((provider) => (
                <ListItem
                    button
                    onClick={() => setProvider(provider)}
                >
                    <ListItemIcon>
                        <PlatformIcon
                            size={32}
                            hostname={provider.hostname}
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={provider.name}
                    />
                </ListItem>
            ))}
        </List>
    );

    if(provider) return (
        <ImportDataScreen
            {...props}
            onBack={() => setProvider(null)}
            provider={provider}
        />);

    return (
        <Dialog {...props}>
            <DialogTitle>
                Import data
            </DialogTitle>
            <ProviderList />
            <DialogActions>
                <Button onClick={() => props.onClose({}, "backdropClick")}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportDataDialog;