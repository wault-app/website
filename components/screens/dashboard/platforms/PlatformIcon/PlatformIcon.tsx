import Platforms from "@lib/client/platforms";
import { makeStyles, Typography } from "@material-ui/core";

export type PlatformIconProps = {
    hostname: string;
};

const size = 96;

const PlatformIcon = ({ hostname }: PlatformIconProps) => {
    const platform = Platforms.get(hostname);

    const backgroundColor = platform?.icon?.color;
    
    const Icon = () => {
        if(platform.icon) return (
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

    const classes = useStyles();

    return (
        <div
            className={classes.root}
            style={{
                backgroundColor,
            }}
        >
            <Icon  />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: size,
        height: size,
        boxShadow: theme.shadows[4],
        borderRadius: size / 4,
        backgroundColor: theme.palette.primary.main,
    },
    icon: {
        margin: size / 4,
        width: size / 2,
        height: size / 2,
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