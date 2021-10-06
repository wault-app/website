import { TextField, TextFieldProps } from "@mui/material";

export type EthereumWalletNameFieldProps = TextFieldProps;

const EthereumWalletNameField = (props: TextFieldProps) => {
    return (
        <TextField 
            label={"Wallet's name"}
            {...props}
        />
    );
};

export default EthereumWalletNameField;