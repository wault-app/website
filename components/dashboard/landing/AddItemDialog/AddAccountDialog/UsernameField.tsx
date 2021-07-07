import { TextField, TextFieldProps } from "@material-ui/core";

const UsernameField = (props: TextFieldProps) => {
    return (
        <TextField
            label={"Username"}
            autoComplete={"username"}
            {...props}
        />
    );
};

export default UsernameField;