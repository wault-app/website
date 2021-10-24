import { Button, Dialog, DialogContent, DialogContentText, DialogProps, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";

export type WarningDialogProps = Omit<DialogProps, "open">;

const WarningDialog = (props: WarningDialogProps) => {
    const [closed, setClosed] = useState(null);

    useEffect(() => {
        setClosed(localStorage?.getItem("legal-acknowledgement") === "accepted");
    }, []);

    const close = () => {
        localStorage?.setItem("legal-acknowledgement", "accepted");
        setClosed(true);
    };

    return (
        <Dialog {...props} open={!closed}>
            <DialogTitle>
                Warning!
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ mb: 2 }}>
                    This is a free-time project of a student, and is provided to you without any warranty. If you accept that, please click on the button below!
                </DialogContentText>
                <Button fullWidth variant={"contained"} size={"large"} color={"primary"} onClick={close}>
                    Accept
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default WarningDialog;