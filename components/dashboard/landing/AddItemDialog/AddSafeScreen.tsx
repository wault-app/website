import { useState, Fragment } from "react";
import { Button, DialogContent, DialogTitle } from "@material-ui/core";
import { DialogFooter } from "@components/providers/DialogProvider";
import SafeNameField from "./AddSafeScreen/SafeNameField";

const AddSafeScreen = () => {
    const [name, setName] = useState("");

    return (
        <Fragment>
            <DialogTitle>
                Create new safe
            </DialogTitle>
            <DialogContent>
                <SafeNameField 
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogFooter>
                <Button>
                    Add
                </Button>
            </DialogFooter>
        </Fragment>
    );
};

export default AddSafeScreen;