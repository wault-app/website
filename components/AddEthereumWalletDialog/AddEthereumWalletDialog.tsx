import EthereumWalletNameField from "@components/EthereumWalletNameField";
import { useKeycards } from "@components/KeycardProvider";
import { useRSA } from "@components/RSAProvider";
import Item from "@lib/api/Item";
import { AddRounded, UploadRounded as ImportIcon } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ItemTypeWithoutID } from "@wault/typings";
import { Wallet } from "ethers";
import { useSnackbar } from "notistack";
import { useState } from "react";

export type AddEthereumWalletDialogProps = DialogProps & {
    onBack: () => void;
};

const AddEthereumWalletDialog = (props: AddEthereumWalletDialogProps) => {
    const { privateKey } = useRSA();
    const { keycards, addItem } = useKeycards();
    const { enqueueSnackbar } = useSnackbar();

    const [mode, setMode] = useState<"generate" | "import">();
    const [name, setName] = useState("");
    // todo: disabled and setKeycard update
    const [, setDisabled] = useState(false);
    const [keycard] = useState(keycards[0]);
    
    const generate = async () => {
        setDisabled(true);

        const data: ItemTypeWithoutID = {
            type: "wallet",
            name,
            blockchain: "ethereum",
            privateKey: Wallet.createRandom().privateKey,
        };

        const { item, message } = await Item.create(keycard, data, privateKey);

        addItem(keycard, item);

        enqueueSnackbar(message, {
            variant: "success",
        });

        setMode(null);
        setName("");
        props.onClose({}, "backdropClick");

        setDisabled(false);
    };

    if(mode === "generate") {
        return (
            
            <Dialog {...props}>
                <DialogTitle>
                    Generate new Ethereum wallet
                </DialogTitle>
                <DialogContent>
                    <EthereumWalletNameField 
                        value={name}
                        fullWidth
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setMode(null)}>
                        Back
                    </Button>
                    <Button onClick={() => generate()}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <Dialog {...props}>
            <DialogTitle>
                Add new Ethereum wallet
            </DialogTitle>
            <List>
                <ListItem button onClick={() => setMode("generate")}>
                    <ListItemIcon>
                        <AddRounded />
                    </ListItemIcon>
                    <ListItemText
                        primary={"Generate new wallet"}
                        secondary={"Will create an empty wallet with nothing inside it"}
                    />
                </ListItem>
                <ListItem button onClick={() => setMode("import")}>
                    <ListItemIcon>
                        <ImportIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={"Import an existing wallet"}
                        secondary={"Use this to import an already created wallet"}
                    />
                </ListItem>
            </List>
            <DialogActions>
                <Button onClick={() => props.onBack()}>
                    Back
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddEthereumWalletDialog;