import { ItemTypeWithoutID } from "@wault/typings";
import { Button, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { ChangeEvent } from "react";
import { ProviderImportType } from "../ImportDataDialog";

export type UploadDataButtonProps = {
    value: ItemTypeWithoutID[];
    onChange: (data: ItemTypeWithoutID[]) => void;
    provider: ProviderImportType;
};

const UploadDataButton = (props: UploadDataButtonProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const onImport = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if (!("TextDecoder" in window)) throw new Error("Sorry, this browser does not support TextDecoder...");

            const encoder = new TextDecoder("utf-8");
            const arr = new Uint8Array(await e.target.files[0].arrayBuffer());
        
            const data = props.provider.converter.convert(encoder.decode(arr));
            props.onChange(data);

            if(data.length === 0) {
                enqueueSnackbar("This file is empty or does not contain any importable element", {
                    variant: "error",
                });
            } else {
                enqueueSnackbar(`Found ${data.length} inside this file!`, {
                    variant: "info",
                });
            }
        } catch(e) {
            enqueueSnackbar(e.message, {
                variant: "error",
            });
        }
    };

    return (
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
                        onChange={onImport}
                    />

                    <Button
                        component="span"
                        variant={"contained"}
                    >
                        Upload file
                    </Button>
                </label>
            </Grid>
        </Grid>
    );
};

export default UploadDataButton;