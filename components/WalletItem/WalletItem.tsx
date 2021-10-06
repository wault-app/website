import { ListItem, ListItemAvatar, ListItemProps, ListItemText } from "@mui/material";
import { WalletType } from "@wault/typings";

export type WalletItemProps = ListItemProps & {
    wallet: WalletType;
};

const WalletItem = (props: WalletItemProps) => {
    console.log(props.wallet);
    return (
        <ListItem
            {...props}
        >

            <ListItemAvatar sx={{ mr: 1 }}>

            </ListItemAvatar>
            <ListItemText
                primary={props.wallet.name}
                secondary={props.wallet.blockchain}
            />
        </ListItem>
    );
};

export default WalletItem;