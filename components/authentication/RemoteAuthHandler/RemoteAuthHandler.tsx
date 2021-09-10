import RemoteAuthentication from "@lib/api/RemoteAuthentication";
import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useRSA } from "@components/providers/RSAProvider";
import { UserType } from "@wault/typings";
import Image from "next/image";

export type RemoteAuthHandlerProps = {};

const RemoteAuthHandler = (props: RemoteAuthHandlerProps) => {
    const [qr, setQR] = useState<string>();
    const [user, setUser] = useState<UserType>();
    const { setPrivateKey, setPublicKey } = useRSA();

    useEffect(() => {
        (async () => {
            const handler = await RemoteAuthentication.start();

            handler.onScan((user) => {
                setUser(user);
            });

            handler.onSuccess(({ privateKey, publicKey }) => {
                setPrivateKey(privateKey);
                setPublicKey(publicKey);
            });

            console.log(await QRCode.toDataURL(handler.getId()));
            setQR(await QRCode.toDataURL(handler.getId()));
        })();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {!!qr && (
                    <Image
                        width={64}
                        height={64}
                        src={qr}
                    />
                )}
            </Grid>
            <Grid item xs={12}>
                <Typography variant={"h5"} component={"h2"}>
                    Scan the QR code!
                </Typography>
                <Typography>
                    You can use the Wault app or just your Camera app.
                </Typography>
            </Grid>
        </Grid>
    );
};

export default RemoteAuthHandler;