import { Card, CardContent, Grid, makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import Head from "next/head";
import { Fragment } from "react";
import ResponsiveCard from "./ResponsiveCard";
import QRCode from "qrcode.react";
import Image from "next/image";

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
                    <Grid className={classes.card} container spacing={2} justifyContent={"center"}>
                        <Grid item xs={12} className={classes.container}>
                            <QRCode
                                value="http://facebook.github.io/react/"
                                className={classes.qr}
                                size={156}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"h6"} textAlign={"center"}>Log in with QR Code</Typography>
                            <Typography textAlign={"center"}>Scan this with your Wault app to log in!</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Wrapper>
        </ResponsiveCard>
    );
};

const useStyles = makeStyles((theme) => ({
    card: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    logo: {
        textAlign: "center",
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(4),
        },
        paddingBottom: theme.spacing(2),
    },
    container: {
        justifyContent: "center",
        textAlign: "center",
    },
    qr: {
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#ffffff",
    },
}));

export default SigninPage;