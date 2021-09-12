import PlatformIcon from "@components/platforms/PlatformIcon";
import { Dialog, DialogProps, DialogTitle, DialogActions, Button, List, ListItem, ListItemIcon, ListItemText, Stepper, Step, StepLabel, Typography, StepContent, ButtonProps, Grid } from "@material-ui/core";
import { useState } from "react";
import Platforms from "@wault/platforms";
import LastPassConverter from "@lib/import/LastPassConverter";
import ImportDataScreen from "../ImportDataScreen";
import { ItemTypeWithoutID, KeycardType } from "@wault/typings";
import SelectSafeField from "@components/dashboard/landing/AddItemDialog/SelectSafeField";
import { useKeycards } from "@components/providers/KeycardProvider";
import { useSnackbar } from "notistack";
import Item from "@lib/api/Item";
import { useRSA } from "@components/providers/RSAProvider";

export type ImportDataDialogProps = DialogProps & {};

const providers = [
    {
        hostname: "lastpass.com",
        ...Platforms.get("lastpass.com"),
        converter: LastPassConverter,
    },
];

export type ProviderImportType = (typeof providers)[0];

const ImportDataDialog = (props: ImportDataDialogProps) => {
    const { keycards, addItems } = useKeycards();
    const { enqueueSnackbar } = useSnackbar();
    const { privateKey } = useRSA();

    const [provider, setProvider] = useState<ProviderImportType>();
    const [data, setData] = useState<ItemTypeWithoutID[]>();
    const [keycard, setKeycard] = useState<KeycardType>();
    const [disabled, setDisabled] = useState(false);

    const ProviderList = () => (
        <List>
            {providers.map((provider) => (
                <ListItem
                    key={`provider-option-${provider.hostname}`}
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

    const onImport = async () => {
        try {
            setDisabled(true);

            const resp = await Promise.all(
                data.map(
                    async (row) => await Item.create(keycard, row, privateKey)
                ),
            );

            addItems(keycard, resp.map((row) => row.item)); 
            
            enqueueSnackbar("Successful import!", {
                variant: "success",
            });
        } catch(e) {
            enqueueSnackbar(e.message, {
                variant: "error",
            });

            setDisabled(false);
        }
    };

    const BackButton = (props: ButtonProps) => (
        <Button
            {...props}
        >
            Back
        </Button>
    );

    const NextButton = (props: ButtonProps) => (
        <Button
            variant={"contained"}
            {...props}
        >
            Next
        </Button>
    );

    return (
        <Dialog {...props}>
            <DialogTitle>
                Import data
            </DialogTitle>
            <Stepper
                activeStep={!provider ? 0 : !data ? 1 : !keycard ? 2 : 3}
                orientation={"vertical"}
            >
                <Step>
                    <StepLabel>
                        Select a provider
                    </StepLabel>
                    <StepContent>
                        <Typography>
                            Please select your previous password manager, where you want to import data from.
                        </Typography>
                        <ProviderList />
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>
                        Import your data
                    </StepLabel>
                    <StepContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography>
                                    Please first export your data from the selected password manager and then use those files to import it to Wault.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <ImportDataScreen
                                            value={data}
                                            onChange={(e) => setData(e)}
                                            provider={provider}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <BackButton
                                            fullWidth
                                            onClick={() => setProvider(null)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                        </Grid>
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>
                        Select a safe
                    </StepLabel>
                    <StepContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography>
                                    Please select a safe, that you want to use to import your data to.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <SelectSafeField
                                    value={keycard?.safe.id}
                                    onChange={(e) => setKeycard(keycards.find((el) => el.safe.id === e.target.value))}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <NextButton />
                                    </Grid>
                                    <Grid item>
                                        <BackButton
                                            onClick={() => setData(null)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>
                        Import!
                    </StepLabel>
                    <StepContent>
                        <Grid container spacing={1}>
                            {/*
                            <Grid item xs={12}>
                                <Typography>
                                    Please select a safe, that you want to use to import your data to.
                                </Typography>
                            </Grid>
                            */}
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Button
                                            onClick={() => onImport()}
                                            disabled={disabled}
                                            variant={"contained"}
                                        >
                                            Import
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <BackButton
                                            disabled={disabled}
                                            onClick={() => setKeycard(null)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </StepContent>
                </Step>
            </Stepper>
            <DialogActions>
                <Button onClick={() => props.onClose({}, "backdropClick")}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportDataDialog;