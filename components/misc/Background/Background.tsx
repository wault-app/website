import { useTheme } from "@mui/material";
import { Box, BoxProps } from "@mui/system";

export type BackgroundProps = BoxProps;

const Background = (props: BackgroundProps) => {
    const theme = useTheme();
    
    return (
        <Box
            {...props}
            sx={{
                background: `radial-gradient(circle at 30% 107%, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 5%, ${theme.palette.primary.main} 45%, ${theme.palette.primary.dark} 90%)`,
                ...props.sx,
            }}
        />
    );
};

export default Background;