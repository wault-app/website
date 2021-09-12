import { TextField, TextFieldProps } from "@material-ui/core";

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