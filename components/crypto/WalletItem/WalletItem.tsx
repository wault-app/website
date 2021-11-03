import EthereumIcon from "@components/icons/EthereumIcon";
import WalletDialog from "@components/crypto/WalletDialog";
import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { WalletType } from "@wault/typings";
import { useState } from "react";

export type WalletItemProps = {
    wallet: WalletType;
};

const WalletItem = (props: WalletItemProps) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <Box>
            <WalletDialog
                maxWidth={"sm"}
                fullWidth
                wallet={props.wallet}
                open={open}
                onClose={() => setOpen(false)}
            />
            <ListItem
                button
                onClick={() => setOpen(true)}
            >
                <ListItemAvatar sx={{ mr: 1 }}>
                    <Box sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        background: "linear-gradient(#c99d66, #3c3c3d)",
                        // @ts-ignore
                        boxShadow: theme.shadows[2],
                    }}>
                        <EthereumIcon
                            width={24}
                            height={24}
                            sx={{ m: 1.5 }}
                        />
                    </Box>
                </ListItemAvatar>
                <ListItemText
                    primary={props.wallet.name}
                    secondary={`Ethereum wallet`}
                />
            </ListItem>
        </Box>
    );
};

export default WalletItem;