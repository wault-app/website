import Platforms from "@lib/client/platforms";
import { makeStyles, Skeleton, Theme, Typography } from "@material-ui/core";
import { DetailedHTMLProps, HTMLAttributes } from "react";

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
                variant={"rectangular"}
                animation={"wave"}
                className={classes.loader}
            />
        );
    }

    const { hostname } = props;
    const platform = Platforms.get(hostname);

    const backgroundColor = platform?.icon?.color;

    const Icon = () => {
        if (platform?.icon) return (
            <platform.icon.badge
                className={classes.icon}
            />
        );

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
                backgroundColor,
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
        },
        loader: {
            width: props => props.size,
            height: props => props.size,
            boxShadow: theme.shadows[4],
            borderRadius: props => props.size / 4,
        },
        icon: {
            margin: props => props.size / 4,
            width: props => `${props.size / 2}px !important`,
            height: props => `${props.size / 2}px !important`,
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

export default PlatformIcon;