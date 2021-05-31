import { Grid, makeStyles, Skeleton, Typography } from "@material-ui/core";
import QRCode from "qrcode.react";

export type ScanQRCodeProps = {
    loading: true;
} | {
    value: string;
};

const size = 156;

const ScanQRCode = (props: ScanQRCodeProps) => {
    const classes = useStyles();

    return (
        <Grid className={classes.card} container spacing={2} justifyContent={"center"}>
            <Grid item xs={12} className={classes.container}>
                {"loading" in props ? (
                    <QRCodeLoader />
                ) : (
                    <QRCode
                        value="http://facebook.github.io/react/"
                        className={classes.qr}
                        size={size}
                    />
                )}
            </Grid>
            <Grid item xs={12}>
                <Typography variant={"h6"} textAlign={"center"}>Log in with QR Code</Typography>
                <Typography textAlign={"center"}>Scan this with your Wault app to log in!</Typography>
            </Grid>
        </Grid>
    );
};


const QRCodeLoader = () => {
    const classes = useStyles();

    return (
        <Skeleton
            className={classes.loader}
            variant={"rectangular"}
            width={size}
            height={size}
            animation={"wave"}
        />
    );
};

const useStyles = makeStyles((theme) => ({
    card: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    container: {
        justifyContent: "center",
        textAlign: "center",
    },
    loader: {
        borderRadius: theme.shape.borderRadius,
        marginLeft: "auto",
        marginRight: "auto",
    },
    qr: {
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
    },
}));

export default ScanQRCode;