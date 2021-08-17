import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Image from "next/image";

export type ScanQRCodeProps = {
    loading: true;
} | {
    image: string;
};

const size = 128;

const ScanQRCode = (props: ScanQRCodeProps) => {
    const classes = useStyles();

    return (
        <Grid className={classes.card} container spacing={2} justify={"center"}>
            <Grid item xs={12} className={classes.container}>
                {"loading" in props ? (
                    <QRCodeLoader />
                ) : (
                    <div
                        className={classes.qrWrapper}
                    >
                        
                        <Image
                            width={128}
                            height={128}
                            alt={"QR code to be scanned"}
                            className={classes.qr}
                            src={props.image}
                        />
                        </div>
                )}
            </Grid>
            <Grid item xs={12}>
                <Typography variant={"h6"} align={"center"}>
                    Log in with QR Code
                </Typography>
                <Typography align={"center"}>Scan this with your Wault app to log in!</Typography>
            </Grid>
        </Grid>
    );
};


const QRCodeLoader = () => {
    const classes = useStyles();

    return (
        <Skeleton
            className={classes.loader}
            variant={"rect"}
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
        boxShadow: theme.shadows[8],
        marginLeft: "auto",
        marginRight: "auto",
    },
    qrWrapper: {
        display: "inline-block",
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[8],
        maxWidth: "100%",
        width: 128,
        height: 128,
    },
    qr: {
        display: "block",
        borderRadius: theme.shape.borderRadius,
        width: 128,
        height: 128,
    },
}));

export default ScanQRCode;