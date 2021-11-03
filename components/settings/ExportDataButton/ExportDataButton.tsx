import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Fragment } from "react";
import { useKeycards } from "@components/providers/KeycardProvider";
import { useUser } from "@components/providers/AuthenticationProvider/AuthenticationProvider";
import DatabaseExportIcon from "@components/icons/DatabaseExportIcon";

export type ExportDataButtonProps = {};

const ExportDataButton = (props: ExportDataButtonProps) => {
    const user = useUser();
    const { keycards } = useKeycards();

    const download = () => {
        const element = document.createElement("a");
        const textFile = new Blob([
            JSON.stringify({
                user,
                keycards,
            }),
        ]);

        element.href = URL.createObjectURL(textFile);
        element.download = "wault-data.json";
        document.body.appendChild(element); 
        
        element.click();
    };

    return (
        <Fragment>
            <ListItem button onClick={() => download()}>
                <ListItemIcon>
                    <DatabaseExportIcon />
                </ListItemIcon>
                <ListItemText primary={"Export data"} />
            </ListItem>
        </Fragment>
    );
};

export default ExportDataButton;