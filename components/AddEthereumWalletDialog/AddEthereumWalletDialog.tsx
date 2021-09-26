import { Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";

export type AddEthereumWalletDialogProps = DialogProps & {
    onBack: () => void;
};

const AddEthereumWalletDialog = (props: AddEthereumWalletDialogProps) => {
    const [mode, setMode] = useState<"generate" | "import">();

    return (
        <Dialog {...props}>
            <DialogTitle>
                Add new Ethereum wallet
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <ButtonBase sx={{ textAlign: "left", p: 2, borderRadius: 1 }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant={"h6"}>
                                        Generate a new wallet
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>
                                        We will create you a brand new Ethereum wallet with nothing inside it. You can use your public key to make deposits to it.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ButtonBase>
                    </Grid>
                    <Divider orientation="vertical" flexItem>
                        VERTICAL
                    </Divider>
                    <Grid item xs>
                        <Typography variant={"h6"}>
                            Import an existing wallet
                        </Typography>
                        <Typography>
                            If you already has an existing wallet, then you can import it to our services with your public and private key.
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.onBack()}>
                    Back
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddEthereumWalletDialog;