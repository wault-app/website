import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { DatabaseImportOutline } from "mdi-material-ui";
import { Fragment, useState } from "react";
import ImportDataDialog from "./ImportDataDialog";

export type ImportDataButtonProps = {};

const ImportDataButton = (props: ImportDataButtonProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <ImportDataDialog
                maxWidth={"sm"}
                fullWidth
                open={open}
                onClose={() => setOpen(false)}
            />
            <ListItem button onClick={() => setOpen(true)}>
                <ListItemIcon>
                    <DatabaseImportOutline />
                </ListItemIcon>
                <ListItemText primary={"Import data"} />
            </ListItem>
        </Fragment>
    );
};

export default ImportDataButton;