import { TextField, TextFieldProps } from "@mui/material";

export type UsernameTextFieldProps = TextFieldProps;

const UsernameTextField = (props: UsernameTextFieldProps) => {
    return (
        <TextField
            label={"Username"}
            fullWidth
            variant={"filled"}
            {...props}
        />
    );
};

export default UsernameTextField;