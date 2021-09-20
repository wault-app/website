import { Chip, ChipProps, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/system";
import { useMemo } from "react";

export type TagProps = ChipProps & {
    color?: any;
};

const Tag = (props: TagProps) => {
    const theme = useMemo(
        () => createTheme({
            palette: {
                primary: props.color,
            }
        })
    , [props.color]);

    if(props.color) {
        return (
            <ThemeProvider
                theme={theme}
            >
                <Chip
                    {...props}
                    color={"primary"}
                />
            </ThemeProvider>
        );
    }
    
    return (
        <Chip {...props} />
    );
};

export default Tag;