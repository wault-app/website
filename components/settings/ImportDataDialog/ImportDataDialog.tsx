import PlatformIcon from "@components/account/PlatformIcon";
import { Dialog, DialogProps, DialogTitle, DialogActions, Button, List, ListItem, ListItemIcon, ListItemText, Stepper, Step, StepLabel, Typography, StepContent, ButtonProps, Grid, DialogContent } from "@mui/material";
import { useState } from "react";
import Platforms from "@wault/platforms";
import LastPassConverter from "@lib/import/LastPassConverter";
import UploadDataButton from "@components/inputs/UploadDataButton";
import { ItemTypeWithoutID, KeycardType } from "@wault/typings";
import SafeSelector from "@components/inputs/SafeSelector/SafeSelector";
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
        } catch (e) {
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
            <DialogContent>

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
                                            <UploadDataButton
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
                                    <SafeSelector
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
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.onClose({}, "backdropClick")}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportDataDialog;