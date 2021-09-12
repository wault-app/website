import { TextField, TextFieldProps } from "@material-ui/core";

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