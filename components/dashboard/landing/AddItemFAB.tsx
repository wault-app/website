import { useDialog } from "@components/DialogProvider";
import { Fab, makeStyles } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { Fragment } from "react";
import AddItemDialog from "./AddItemDialog";

const AddItemFAB = () => {
    const classes = useStyles();
    const { open } = useDialog();

    return (
        <Fragment>
            <Fab
                className={classes.fab}
                color={"primary"}
                onClick={() => open(
                    <AddItemDialog />,
                    {
                        maxWidth: "sm"
                    }
                )}
            >
                <AddRounded />
            </Fab>
        </Fragment>
    );
};

const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: theme.spacing(4),
        right: theme.spacing(4),
        zIndex: 2,
    },
}));

export default AddItemFAB;