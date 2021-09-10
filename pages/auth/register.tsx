import EmailTextField from "@components/authentication/EmailTextField";
import PasswordTextField from "@components/authentication/PasswordTextField";
import UsernameTextField from "@components/authentication/UsernameTextField";
import ResponsiveCard from "@components/common/ResponsiveCard";
import VerticalCenter from "@components/common/VerticalCenter";
import Authentication from "@lib/api/Authentication";
import { Button, CardContent, Container, Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useRSA } from "@components/providers/RSAProvider";

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
    
        <Container>
            <VerticalCenter>
                <ResponsiveCard>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    variant={"h5"}
                                >
                                    Registration
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
                                    fullWidth
                                    variant={"contained"}
                                    disabled={disabled || !username || !password || !email || !passwordAgain || passwordAgain !== password}
                                    onClick={register}
                                >
                                    Register
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant={"outlined"}
                                    disabled={disabled}
                                    onClick={() => router.push("/auth/signin")}
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </ResponsiveCard>
            </VerticalCenter>
        </Container>
    );
};

export default RegistrationPage;