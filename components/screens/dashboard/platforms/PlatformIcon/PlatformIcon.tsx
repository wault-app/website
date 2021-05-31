import Platforms from "@lib/client/platforms";
import { makeStyles, Skeleton, Typography } from "@material-ui/core";

export type PlatformIconProps = {
    hostname: string;
} | {
    loading: true;
};

const size = 96;

const PlatformIcon = (props: PlatformIconProps) => {
    const classes = useStyles();

    if ("loading" in props) {
        return (
            <Skeleton
                width={size}
                height={size}
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
        if (platform.icon) return (
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
            className={classes.root}
            style={{
                backgroundColor,
            }}
        >
            <Icon />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: size,
        height: size,
        borderRadius: size / 4,
        backgroundColor: theme.palette.primary.main,
    },
    loader: {
        width: size,
        height: size,
        boxShadow: theme.shadows[4],
        borderRadius: size / 4,
    },
    icon: {
        margin: size / 4,
        width: `${size / 2}px !important`,
        height: `${size / 2}px !important`,
    },
    text: {
        padding: size / 4,
        height: size,
        width: size,
        textAlign: "center",
        fontSize: `${size / 3}px !important`,
        lineHeight: `${size / 2}px !important`,
        margin: "auto",
        color: theme.palette.primary.contrastText,
    },
}));

export default PlatformIcon;