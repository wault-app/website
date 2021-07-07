import { TextField, TextFieldProps } from "@material-ui/core";

export type CardHolderNameFieldProps = TextFieldProps;

const CardHolderNameField = (props: CardHolderNameFieldProps) => {
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

export default CardHolderNameField;