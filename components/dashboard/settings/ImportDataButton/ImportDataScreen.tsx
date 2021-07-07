import SelectSafeField from "@components/dashboard/landing/AddItemDialog/SelectSafeField";
import { useKeycards } from "@components/providers/KeycardProvider";
import Item, { ItemTypeWithoutID } from "@lib/client/api/Item";
import { KeycardType } from "@lib/client/api/Safe";
import { Dialog, DialogProps, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemIcon, ListItemText, Grid } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { ProviderImportType } from "./ImportDataDialog";

export type ImportDataScreenProps = DialogProps & {
    onBack: () => void;
    provider: ProviderImportType;
};

const ImportDataScreen = (props: ImportDataScreenProps) => {
    const { keycards, addItem } = useKeycards(); 
    const { enqueueSnackbar } = useSnackbar();
    
    const [data, setData] = useState<ItemTypeWithoutID[]>([]);
    const [keycard, setKeycard] = useState<KeycardType>(keycards[0]);
    const [disabled, setDisabled] = useState(false);

    const upload = async () => {
        try {
            setDisabled(true);

            await Promise.all(
                data.map(
                    async (row) => {
                        addItem(keycard, await Item.create(keycard.safe, row));
                    }
                )
            );

            enqueueSnackbar("Successful import!", {
                variant: "success",
            });

            console.log(data);

            props.onBack();
            props.onClose({}, "backdropClick");
            setData([]);
        } catch(e) {
            enqueueSnackbar(e.message, {
                variant: "error",
            });
        }

        setDisabled(false);
    };

    return (
        <Dialog {...props}>
            <DialogTitle>
                Import data
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <label htmlFor={"upload-file"}>
                            <input
                                style={{
                                    display: "none"
                                }}
                                type="file"
                                id={"upload-file"}
                                name={"upload-file"}
                                onChange={async (e) => {
                                    if (!("TextDecoder" in window))
                                        alert("Sorry, this browser does not support TextDecoder...");

                                    var enc = new TextDecoder("utf-8");
                                    var arr = new Uint8Array(await e.target.files[0].arrayBuffer());
                                    setData(props.provider.converter.convert(enc.decode(arr)));
                                }}
                            />

                            <Button
                                component="span"
                                fullWidth
                                disabled={data.length > 0}
                            >
                                {data.length > 0 ? `${data.length} row found` : "Upload file"}
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12}>
                        <SelectSafeField
                            value={keycard.safe.id}
                            onChange={
                                (e) => setKeycard(
                                    keycards.find(
                                        (keycard) => keycard.safe.id === e.target.value
                                    )
                                )
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            color="primary"
                            variant="contained"
                            size={"large"}
                            fullWidth
                            onClick={upload}
                            disabled={disabled || data.length === 0}
                        >
                            Import
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => props.onBack()}
                >
                    Back
                </Button>
                <Button
                    onClick={() => props.onClose({}, "backdropClick")}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportDataScreen;