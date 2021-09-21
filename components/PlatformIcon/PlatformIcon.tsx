import Platforms from "@wault/platforms";
import { Skeleton, Typography, useTheme } from "@mui/material";
import { memo } from "react";
import { Box, BoxProps } from "@mui/system";

export type PlatformIconProps = ({
    hostname: string;
    size?: number;
} | {
    loading: true;
    size?: number;
}) & BoxProps;

const DEFAULT_SIZE = 72;

const PlatformIcon = (props: PlatformIconProps) => {
    const theme = useTheme();
    const size = props.size || DEFAULT_SIZE;

    if ("loading" in props) {
        return (
            <Skeleton
                width={props.size}
                height={props.size}
                variant={"rectangular"}
                animation={"wave"}
                sx={{
                    width: size,
                    height: size,
                    boxShadow: theme.shadows[2],
                    borderRadius: `${size / 4}px`,
                }}
            />
        );
    }

    const platform = Platforms.get(props.hostname);

    const Icon = () => {
        if (platform?.icon) {         
            const Badge = require(`@wault/platforms/res/${platform.icon}`).default;
                
            return (
                <Badge
                    style={{
                        width: size / 1.75,
                        height: size / 1.75,
                        margin: (size - (size / 1.75)) / 2,
                    }}
                />
            );
        }

        return (
            <Typography
                sx={{
                    color: theme.palette.primary.contrastText,
                    padding: (size - (size / 3)) / 16,
                    height: size,
                    width: size,
                    textAlign: "center",
                    fontSize: size / 3,
                    lineHeight: 1,
                }}
            >
                {platform.name.trim().charAt(0).toUpperCase()}
            </Typography>
        );
    };


    return (
        <Box
            {...props}
            sx={{
                background: platform.color || `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                width: size,
                height: size,
                borderRadius: size / 16,
                boxShadow: theme.shadows[2],
                ...props.sx,
            }}
        >
            <Icon />
        </Box>
    );
};

export default memo(PlatformIcon);