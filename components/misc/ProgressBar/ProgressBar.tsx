import { useTheme } from "@mui/material";
import NextNprogress from "nextjs-progressbar";

export type ProgressBarProps = {};

const ProgressBar = () => {
    const theme = useTheme();

    return (
        <NextNprogress
            color={theme.palette.primary.main}
            startPosition={0.3}
            stopDelayMs={200}
            height={2}
            showOnShallow={true}
            options={{
                showSpinner: false
            }}
        />
    );
};

export default ProgressBar;