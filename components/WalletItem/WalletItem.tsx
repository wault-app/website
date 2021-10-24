import EthereumIcon from "@components/EthereumIcon";
import { ListItem, ListItemAvatar, ListItemProps, ListItemText } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { WalletType } from "@wault/typings";

export type WalletItemProps = ListItemProps & {
    wallet: WalletType;
};

const WalletItem = (props: WalletItemProps) => {
    const theme = useTheme();

    return (
        <ListItem
            {...props}
        >

            <ListItemAvatar sx={{ mr: 1 }}>
                    <Box sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        background: "linear-gradient(#c99d66, #3c3c3d)",
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
    );
};

export default WalletItem;