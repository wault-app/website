import { TextField, TextFieldProps } from "@material-ui/core";

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