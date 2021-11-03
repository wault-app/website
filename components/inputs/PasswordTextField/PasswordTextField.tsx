import { TextField, TextFieldProps } from "@mui/material";

export type PasswordTextFieldProps = TextFieldProps;

const PasswordTextField = (props: PasswordTextFieldProps) => {
    return (
        <TextField
            label={"Password"}
            type={"password"}
            fullWidth
            variant={"filled"}
            {...props}
        />
    );
};

export default PasswordTextField;