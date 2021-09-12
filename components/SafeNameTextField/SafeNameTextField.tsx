import { TextField, TextFieldProps } from "@material-ui/core";

const SafeNameTextField = (props: TextFieldProps) => {
    return (
        <TextField 
            label={"Name"}
            {...props}
        />
    );
};

export default SafeNameTextField;