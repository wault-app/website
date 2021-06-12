import { IconButton, InputAdornment, TextField, TextFieldProps } from "@material-ui/core";
import { VisibilityOffRounded as HideIcon, VisibilityRounded as ShowIcon } from "@material-ui/icons";
import { useState } from "react";

const PasswordField = (props: TextFieldProps) => {
    const [show, setShow] = useState(false);

    return (
        <TextField
            type={show ? "text" : "password"}
            label={"Password"} 
            InputProps={{
                endAdornment: (
                    <InputAdornment position={"end"}>
                        <IconButton onClick={() => setShow(!show)}>
                            {show ? (
                                <HideIcon />
                            ) : (
                                <ShowIcon />
                            )}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    );
};

export default PasswordField;