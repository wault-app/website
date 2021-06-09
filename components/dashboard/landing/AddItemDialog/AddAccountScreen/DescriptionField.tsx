import { TextField, TextFieldProps } from "@material-ui/core";

const DescriptionField = (props: TextFieldProps) => {
    return (
        <TextField 
            label={"Description"}
            multiline
            minRows={3}
            maxRows={6}
            {...props}
        />
    );
};

export default DescriptionField;