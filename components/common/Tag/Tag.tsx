import { Chip, ChipProps, createMuiTheme, ThemeProvider } from "@material-ui/core";

export type TagProps = ChipProps & {
    color?: any;
};

const Tag = (props: TagProps) => {
    if(props.color) {
        return (
            <ThemeProvider
                theme={createMuiTheme({
                    palette: {
                        primary: props.color,
                    }
                })}
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