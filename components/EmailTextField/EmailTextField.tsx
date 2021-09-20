import { TextField, TextFieldProps } from "@mui/material";

export type EmailTextFieldProps = TextFieldProps;

const EmailTextField = (props: EmailTextFieldProps) => {
    return (
        <TextField 
            label={"Email address"}
            type={"email"}
            inputMode={"email"}
            fullWidth
            variant={"filled"}
            {...props}
        />
    );
};

export default EmailTextField;