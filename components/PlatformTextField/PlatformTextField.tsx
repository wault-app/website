import PlatformIcon from "@components/PlatformIcon";
import Platforms from "@wault/platforms";
import { InputAdornment, TextField, TextFieldProps, Tooltip } from "@material-ui/core";
import { Fragment } from "react";

const PlatformTextField = (props: TextFieldProps) => {
    if (typeof props.value !== "string") return <Fragment />;

    const platform = Platforms.get(props.value);

    return (
        <TextField
            label={"Platform"}
            required
            type={"url"}
            {...props}
            InputProps={{
                endAdornment: props.value.length > 0 && (
                    <Tooltip title={platform.name || props.value}>
                        <InputAdornment position="end">
                            <PlatformIcon
                                size={32}
                                hostname={props.value}
                            />
                        </InputAdornment>
                    </Tooltip>
                ),
            }}
        />

    );
};

export default PlatformTextField;