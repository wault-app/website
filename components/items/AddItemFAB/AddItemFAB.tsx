import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/AddRounded";
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
                    right: 0,
                    bottom: 0,
                    mr: 4,
                    mb: 4,
                }}
            >
                <AddIcon />
            </Fab>
        </Fragment>
    );
};

export default AddItemFAB;