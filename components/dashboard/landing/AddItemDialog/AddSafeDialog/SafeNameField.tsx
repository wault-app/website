import { TextField, TextFieldProps } from "@material-ui/core";

const SafeNameField = (props: TextFieldProps) => {
    return (
        <TextField 
            label={"Name"}
            {...props}
        />
    );
};

export default SafeNameField;