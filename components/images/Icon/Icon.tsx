import { useTheme } from "@mui/material";
import { SVGProps } from "react";

const Icon = (props: SVGProps<SVGSVGElement>) => {
    const theme = useTheme();

    const arm = {
        fill: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            {...props}
        >
            <path
                style={arm}
                d="M87.77,351.23,15.06,423.89a51.34,51.34,0,0,0,0,72.65h0a51.43,51.43,0,0,0,72.71,0l72.72-72.65a51.35,51.35,0,0,0,0-72.66h0A51.46,51.46,0,0,0,87.77,351.23Z"
            />
            <path
                style={arm}
                d="M424.23,15.26,351.09,88.33a51.35,51.35,0,0,0,0,72.66h0a51.46,51.46,0,0,0,72.72,0l73.13-73.08a51.34,51.34,0,0,0,0-72.65h0A51.43,51.43,0,0,0,424.23,15.26Z"
            />
            <path
                style={arm}
                d="M496.94,497h0a51.44,51.44,0,0,1-72.72,0L351.1,423.89a51.35,51.35,0,0,1,0-72.66h0a51.45,51.45,0,0,1,72.71,0l73.13,73.07A51.36,51.36,0,0,1,496.94,497Z"
            />
            <path
                style={arm}
                d="M160.49,160.78h0a51.46,51.46,0,0,1-72.72,0L15.06,88.12a51.34,51.34,0,0,1,0-72.65h0a51.43,51.43,0,0,1,72.71,0l72.72,72.65A51.35,51.35,0,0,1,160.49,160.78Z"
            />
            <rect
                style={{
                    fill: "none",
                    strokeMiterlimit: 10,
                    strokeWidth: 102,
                    stroke: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                }}
                x="101.67"
                y="101.75"
                width="308.25"
                height="308.5"
                rx="154.13"
                transform="translate(-0.21 511.8) rotate(-90)"
            />
        </svg>

    );
};

export default Icon;