import { CreditCardType } from "@wault/typings";
import { Button, Dialog, DialogContent, DialogActions, Grid, List, ListItem, ListItemIcon, ListItemText, DialogProps } from "@mui/material";
import ShowIcon from "@mui/icons-material/VisibilityRounded";
import HideIcon from "@mui/icons-material/VisibilityOffRounded";
import { useState } from "react";
import ReactCreditCard from "react-credit-cards";
import CopyCardNumberButton from "../CopyCardNumberButton";
import { Box } from "@mui/system";

export type CreditCardDialogProps = DialogProps & {
    creditCard: CreditCardType;
};

const CreditCardDialog = (props: CreditCardDialogProps) => {
    const [show, setShow] = useState(false);
    const { creditCard } = props;

    return (
        <Dialog {...props}>
            <DialogContent
                sx={{
                    minHeight: 300,
                    p: 0,
                }}
            >
                <Grid container>
                    <Grid item xs={12} md={5}>
                        <Box sx={{
                            width: "100%",
                            p: 4,
                        }}>
                            <ReactCreditCard
                                name={creditCard.cardholder}
                                cvc={creditCard.cvc}
                                number={creditCard.number}
                                expiry={creditCard.expiry}
                                focused={show ? "cvc" : null}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <List>
                            <ListItem button onClick={() => setShow(!show)}>
                                <ListItemIcon>
                                    {!show ? (
                                        <ShowIcon />
                                    ) : (
                                        <HideIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={!show ? "Show CVC / CVV" : "Hide CVC / CVV"}
                                />
                            </ListItem>
                            {creditCard.number && (
                                <CopyCardNumberButton number={creditCard.number} />
                            )}
                        </List>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => props.onClose({}, "backdropClick")}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreditCardDialog;