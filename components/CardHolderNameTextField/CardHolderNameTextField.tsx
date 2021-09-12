import { TextField, TextFieldProps } from "@material-ui/core";

export type CardHolderNameTextFieldProps = TextFieldProps;

const CardHolderNameTextField = (props: CardHolderNameTextFieldProps) => {
    return (
        <TextField
            variant={"outlined"}
            autoComplete={"cc-name"}
            label={"Card holder's name"}
            fullWidth
            {...props}
        />
    );
};

export default CardHolderNameTextField;