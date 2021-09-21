import EmailTextField from "@components/EmailTextField";
import PasswordTextField from "@components/PasswordTextField";
import UsernameTextField from "@components/UsernameTextField";
import VerticalCenter from "@components/VerticalCenter";
import Authentication from "@lib/api/Authentication";
import { Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useRSA } from "@components/RSAProvider";
import Background from "@components/Background";

const RegistrationPage = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [disabled, setDisabled] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const { setPrivateKey, setPublicKey } = useRSA();

    const register = async (e: any) => {
        e.preventDefault();

        try { 
            setDisabled(true);

            const { message, publicKey, privateKey } = await Authentication.register(username, email, password);
        
            enqueueSnackbar(message, {
                variant: "success",
            });

            setPrivateKey(publicKey);
            setPublicKey(privateKey);

            router.push("/");
        } catch(e) {
            enqueueSnackbar(e.message, {
                variant: "error",
            });

            setDisabled(false);
        }
    };

    return (
        <Container maxWidth={"xs"} sx={{ height: "100%" }}>
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
                                <Typography
                                    variant={"h5"}
                                    textAlign={"center"}
                                >
                                    Registration
                                </Typography>
                                <Typography
                                    textAlign={"center"}
                                >
                                    Create a new Wault account.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <EmailTextField
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <UsernameTextField
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordTextField
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordTextField
                                    value={passwordAgain}
                                    onChange={(e) => setPasswordAgain(e.target.value)}
                                    label={"Password again"}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    sx={{ float: "right" }}
                                    variant={"contained"}
                                    disabled={disabled || !username || !password || !email || !passwordAgain || passwordAgain !== password}
                                    onClick={register}
                                >
                                    Register
                                </Button>
                                <Button
                                    disabled={disabled}
                                    onClick={() => router.push("/auth/signin")}
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </VerticalCenter>
        </Container>
    );
};

export default RegistrationPage;