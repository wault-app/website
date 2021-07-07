import PlatformIcon from "@components/platforms/PlatformIcon";
import Platforms from "@lib/client/platforms";
import { InputAdornment, TextField, TextFieldProps, Tooltip } from "@material-ui/core";
import { Fragment } from "react";

const PlatformField = (props: TextFieldProps) => {
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

export default PlatformField;