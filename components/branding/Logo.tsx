import { makeStyles } from "@material-ui/core";

export type LogoProps = {};

const Logo = () => {
    const classes = useStyles();

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 672 121"
        >
            <rect
                className={classes.logo}
                x="16.91"
                y="-3.74"
                width="48"
                height="128"
                rx="24"
                transform="translate(-21.63 22.94) rotate(-25)"
            />
            <rect
                className={classes.logo}
                x="50.9"
                y="-3.74"
                width="48"
                height="128"
                rx="24"
                transform="translate(32.48 -26.01) rotate(25)"
            />
            <rect
                className={classes.logo}
                x="85.09"
                y="-3.74"
                width="48"
                height="128"
                rx="24"
                transform="translate(-15.25 51.75) rotate(-25)"
            />
            <rect
                className={classes.logo}
                x="119.08"
                y="-3.74"
                width="48"
                height="128"
                rx="24"
                transform="translate(38.87 -54.82) rotate(25)"
            />
            <rect
                className={classes.logo}
                x="228.68"
                y="-3.65"
                width="48"
                height="128"
                rx="24"
                transform="translate(507.19 8.25) rotate(155)"
            />
            <rect
                className={classes.logo}
                x="194.69"
                y="-3.65"
                width="48"
                height="128"
                rx="24"
                transform="translate(391.38 207.46) rotate(-155)"
            />
            <path
                className={classes.logo}
                d="M336.53.09h49.93A32.94,32.94,0,0,1,419.4,33V62.7a57.91,57.91,0,0,1-57.91,57.91h0A57.91,57.91,0,0,1,303.59,62.7V33A32.94,32.94,0,0,1,336.53.09Z"
            />
            <rect
                className={classes.logo}
                x="464.61"
                y="48.52"
                width="48"
                height="96"
                rx="24"
                transform="translate(392.09 585.12) rotate(-90)"
            />
            <rect className={classes.logo} x="440.61" y="0.04" width="48" height="120.48" rx="24" />
            <rect className={classes.logo} x="583.03" y="0.04" width="48" height="120.62" rx="24" />
            <rect
                className={classes.logo}
                x="583.03"
                y="-39.96"
                width="48"
                height="128"
                rx="24"
                transform="translate(583 631.07) rotate(-90)"
            />
        </svg>

    );
};

const useStyles = makeStyles((theme) => ({
    logo: {
        fill: theme.palette.type === "dark" ? "#ffffff" : "#000000",
    },
}));

export default Logo;