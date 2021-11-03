import DatabaseImportIcon from "@components/icons/DatabaseImportIcon";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Fragment, useState } from "react";
import ImportDataDialog from "../ImportDataDialog";

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
                    <DatabaseImportIcon />
                </ListItemIcon>
                <ListItemText primary={"Import data"} />
            </ListItem>
        </Fragment>
    );
};

export default ImportDataButton;