import { TextField, TextFieldProps } from "@mui/material";

const SafeNameTextField = (props: TextFieldProps) => {
    return (
        <TextField 
            label={"Name"}
            {...props}
        />
    );
};

export default SafeNameTextField;