import { Fab, makeStyles } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { Fragment, useState } from "react";
import AddItemDialog from "../AddItemDialog";

const AddItemFAB = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <AddItemDialog
                fullWidth
                maxWidth={"sm"}
                open={open}
                onClose={() => setOpen(false)}
            />
            <Fab
                className={classes.fab}
                color={"primary"}
                onClick={() => setOpen(true)}
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