import { TextField, TextFieldProps } from "@mui/material";

const DescriptionField = (props: TextFieldProps) => {
    return (
        <TextField 
            label={"Description"}
            multiline
            rows={4}
            {...props}
        />
    );
};

export default DescriptionField;