import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Fragment } from "react";
import { DatabaseExportOutline } from "mdi-material-ui";
import { useKeycards } from "@components/KeycardProvider";
import { useUser } from "@components/AuthenticationProvider/AuthenticationProvider";

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
                    <DatabaseExportOutline />
                </ListItemIcon>
                <ListItemText primary={"Export data"} />
            </ListItem>
        </Fragment>
    );
};

export default ExportDataButton;