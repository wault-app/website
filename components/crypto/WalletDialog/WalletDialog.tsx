import { QrCodeRounded, VpnKeyRounded } from "@mui/icons-material";
import { Dialog, DialogProps, Grid, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { WalletType } from "@wault/typings";

export type WalletDialogProps = DialogProps & {
    wallet: WalletType;
};

const WalletDialog = (props: WalletDialogProps) => {
    return (
        <Dialog {...props}>
            <Grid container>
                <Grid item xs={12}>
                    <div />
                </Grid>
                <Grid item xs={12}>
                    <List>
                        <ListItem button onClick={() => { }}>
                            <ListItemIcon>
                                <QrCodeRounded />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Show QR code"}
                            />
                        </ListItem>
                        
                        <ListItem button onClick={() => { }}>
                            <ListItemIcon>
                                <VpnKeyRounded />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Copy private key"}
                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default WalletDialog;