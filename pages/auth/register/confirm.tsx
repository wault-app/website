import { useRSA } from "@components/providers/RSAProvider";
import Authentication from "@lib/api/Authentication";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const RedirectPage = () => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { setPublicKey, setPrivateKey } = useRSA();

    const { id, secret } = router.query;

    useEffect(() => {
        if (typeof id !== "string" || typeof secret !== "string") return;

        const xhr = new XMLHttpRequest();
        const url = `intent://${id}:${secret}#Intent;scheme=wault-auth;package=app.wault;end`;

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                window?.location.replace(url);
            } else {
                (async () => {
                    try {
                        const { message, publicKey, privateKey} = await Authentication.verifyEmail(id, secret);
                        
                        setPublicKey(publicKey);
                        setPrivateKey(privateKey);

                        enqueueSnackbar(message, {
                            variant: "success",
                        });

                        router.push("/");
                    } catch (e) {
                        enqueueSnackbar(e.message, {
                            variant: "error",
                        });
                    }
                })();
            }
        }

        xhr.open('head', url);
        xhr.send(null);
    }, [id, secret, enqueueSnackbar, router, setPrivateKey, setPublicKey]);

    return (
        <Grid
            container
            alignItems={"center"}
            sx={{
                height: "100%",
            }}
        >
            <Grid item xs={12}>
                <Container maxWidth={"sm"}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant={"h5"} align={"center"}>
                                Please wait!
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    );
};

export default RedirectPage;