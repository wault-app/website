import { Container, CardContent, Typography, Grid, TextField, Button, Card } from "@mui/material";
import { useState } from "react";
import Logo from "@components/Logo/Logo";
import VerticalCenter from "@components/VerticalCenter";
import { useSnackbar } from "notistack";
import { useUser } from "@components/AuthenticationProvider/AuthenticationProvider";
import RedirectInProgressScreen from "@components/RedirectInProgressScreen";
import Authentication from "@lib/api/Authentication";
import { useRouter } from "next/router";
import { useRSA } from "@components/RSAProvider";
import User from "@lib/api/User";
import UserComponent from "@components/UserComponent";
import Background from "@components/Background";

const SigninPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);

    const { setPrivateKey, setPublicKey, privateKey } = useRSA();
    const { user, setUser } = useUser();

    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    const isDisabled = disabled || !password || (!email && !user);

    if (user && privateKey) {
        router.push("/");

        return (
            <RedirectInProgressScreen />
        );
    }

    const auth = () => {
        if (isDisabled) return;

        if (user) {
            verifyPassword();
        } else {
            logIn();
        }
    };

    const verifyPassword = async () => {
        setDisabled(true);

        try {
            const { message, publicKey, privateKey } = await Authentication.checkPassword(user.email, password);

            enqueueSnackbar(message, {
                variant: "success",
            });

            setPrivateKey(privateKey);
            setPublicKey(publicKey);

            router.push("/");
        } catch (e) {
            enqueueSnackbar(e.message, {
                variant: "error",
            });

            setDisabled(false);
        }
    };


    const logIn = async () => {
        setDisabled(true);

        try {
            const { message, publicKey, privateKey } = await Authentication.login(email, password);

            const user = await User.get();
            setUser(user);

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

            setDisabled(false);
        }
    };

    return (
        <Container
            maxWidth={"xs"}
            sx={{
                height: "100%",
            }}
        >
            <Background
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                }}
            />
            <VerticalCenter>
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid
                                        sx={{
                                            mt: 4,
                                            mb: 2,
                                        }}
                                        item
                                        xs={12}
                                        textAlign={"center"}
                                    >
                                        <Logo
                                            height={32}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            textAlign={"center"}
                                            variant={"h5"}
                                        >
                                            Authentication
                                        </Typography>
                                        <Typography
                                            textAlign={"center"}
                                        >
                                            Use your Wault account to log in.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {user ? (
                                            <UserComponent />
                                        ) : (
                                            <TextField
                                                fullWidth
                                                variant={"filled"}
                                                value={email}
                                                required
                                                onChange={(e) => setEmail(e.target.value)}
                                                label={"Email address"}
                                                type={"email"}
                                            />
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant={"filled"}
                                            label={"Password"}
                                            type={"password"}
                                            value={password}
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant={"contained"}
                                            disabled={isDisabled}
                                            onClick={auth}
                                            sx={{ float: "right" }}
                                        >
                                            Sign in
                                        </Button>
                                        <Button
                                            disabled={disabled}
                                            onClick={() => router.push("/auth/register")}
                                        >
                                            Register
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </VerticalCenter>
        </Container>
    );
};

export default SigninPage;