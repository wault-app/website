import Platforms from "@wault/platforms";
import { makeStyles, Theme, Typography } from "@material-ui/core";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Skeleton } from "@material-ui/lab";
import { memo } from "react";

export type PlatformIconProps = ({
    hostname: string;
    size?: number;
} | {
    loading: true;
    size?: number;
}) & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const size = 72;

const PlatformIcon = (props: PlatformIconProps) => {
    const classes = useStyles({ size: props.size || size });

    if ("loading" in props) {
        return (
            <Skeleton
                width={props.size}
                height={props.size}
                variant={"rect"}
                animation={"wave"}
                className={classes.loader}
            />
        );
    }

    const { hostname } = props;
    const platform = Platforms.get(hostname);

    const Icon = () => {
        if (platform?.icon) {         
            const Badge = require(`@wault/platforms/res/${platform.icon}`).default;
                
            return (
                <Badge
                    className={classes.icon}
                    width={32}
                    height={32}    
                />
            );
        }

        return (
            <Typography className={classes.text}>
                {platform.name.trim().charAt(0).toUpperCase()}
            </Typography>
        );
    };


    return (
        <div
            {...props}
            className={`${props.className} ${classes.root}`}
            style={{
                backgroundColor: platform.color,
                ...props?.style,
            }}
        >
            <Icon />
        </div>
    );
};

const useStyles = makeStyles<Theme, { size: number }>((theme) => ({
        root: {
            width: props => props.size,
            height: props => props.size,
            borderRadius: props => props.size / 4,
            backgroundColor: theme.palette.primary.main,
            boxShadow: theme.shadows[2],
        },
        loader: {
            width: props => props.size,
            height: props => props.size,
            boxShadow: theme.shadows[2],
            borderRadius: props => props.size / 4,
        },
        icon: {
            margin: props => (props.size - (props.size / 40 * 24)) / 2,
            width: props => `${props.size / 40 * 24}px !important`,
            height: props => `${props.size / 40 * 24}px !important`,
        },
        text: {
            padding: props => props.size / 4,
            height: props => props.size,
            width: props => props.size,
            textAlign: "center",
            fontSize: props => `${props.size / 3}px !important`,
            lineHeight: props => `${props.size / 2}px !important`,
            margin: "auto",
            color: theme.palette.primary.contrastText,
        },
    }
));

export default memo(PlatformIcon);