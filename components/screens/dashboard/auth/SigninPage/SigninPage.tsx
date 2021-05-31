import { Card, CardContent, makeStyles, useMediaQuery } from "@material-ui/core";
import { Fragment } from "react";
import ResponsiveCard from "./ResponsiveCard";
import Image from "next/image";
import ScanQRCode from "./ScanQRCode";

const SigninPage = () => {
    const classes = useStyles();

    const isLarge = useMediaQuery('(min-width:600px)');
    const Wrapper = isLarge ? Card : Fragment;

    return (
        <ResponsiveCard>
            <div className={classes.logo}>
                <Image
                    src={"/img/logo.png"}
                    width={224}
                    height={40}
                />
            </div>
            <Wrapper variant={"outlined"}>
                <CardContent>
                    <ScanQRCode loading />
                </CardContent>
            </Wrapper>
        </ResponsiveCard>
    );
};

const useStyles = makeStyles((theme) => ({
    logo: {
        textAlign: "center",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(4),
        },
    },
}));

export default SigninPage;