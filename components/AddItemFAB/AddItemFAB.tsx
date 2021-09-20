import { Fab } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import { Fragment, useState } from "react";
import AddItemDialog from "../AddItemDialog";

const AddItemFAB = () => {
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
                color={"primary"}
                onClick={() => setOpen(true)}
                sx={{
                    zIndex: 2,
                    position: "fixed",
                    right: 16,
                    bottom: 16,
                }}
            >
                <AddRounded />
            </Fab>
        </Fragment>
    );
};

export default AddItemFAB;