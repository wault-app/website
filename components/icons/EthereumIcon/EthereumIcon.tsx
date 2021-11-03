import { SvgIcon, SvgIconProps } from "@mui/material";

export type EthereumIconProps = SvgIconProps;

const EthereumIcon = (props: EthereumIconProps) => {
    return (
        <SvgIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" {...props}>
            <path d="m12 1.75-6.25 10.5L12 16l6.25-3.75L12 1.75M5.75 13.5 12 22.25l6.25-8.75L12 17.25 5.75 13.5Z"/>
        </SvgIcon>
    );
};

export default EthereumIcon;