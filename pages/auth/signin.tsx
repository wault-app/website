import { useUser } from "@components/providers/AuthenticationProvider";
import EmailTextField from "@components/inputs/EmailTextField";
import Logo from "@components/images/Logo";
import PasswordTextField from "@components/inputs/PasswordTextField";
import RedirectInProgressScreen from "@components/screens/RedirectInProgressScreen";
import { useRSA } from "@components/providers/RSAProvider";
import UserComponent from "@components/navbar/UserComponent";
import VerticalCenter from "@components/misc/VerticalCenter";
import Authentication from "@lib/api/Authentication";
import User from "@lib/api/User";
import CreditCardIcon from "@mui/icons-material/CreditCardRounded";
import CryptoIcon from "@mui/icons-material/LocalAtmRounded";
import TwoFactorAuthenticationIcon from "@mui/icons-material/LockRounded";
import AccountIcon from "@mui/icons-material/PersonRounded";
import { Button, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";

export type SigninPageProps = {};

const features = [
    {
        title: "Store your accounts",
        description: "Save unlimited number of accounts",
        icon: AccountIcon,
    },
    {
        title: "Two factor authentication",
        description: "You won't need your phone to log in ever again",
        icon: TwoFactorAuthenticationIcon,
    },
    {
        title: "Cryptocurrencies go brrrr",
        description: "Store your Ethereum wallet and check the value of it",
        icon: CryptoIcon,
    },
    {
        title: "Faster shopping",
        description: "We can autofill your credit card details",
        icon: CreditCardIcon,
    },
];

const SigninPage = (props: SigninPageProps) => {
    const router = useRouter();
    const { user, setUser } = useUser();
    const { privateKey, setPublicKey, setPrivateKey } = useRSA();
    const { enqueueSnackbar } = useSnackbar();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);

    if (user && privateKey) {
        router.push("/");

        return (
            <RedirectInProgressScreen />
        );
    }

    const auth = async () => {
        if (disabled) return;

        setDisabled(true);

        try {
            const { publicKey, privateKey, message } = !user ? await login() : await verifyPassword();

            setUser(await User.get());

            setPublicKey(publicKey);
            setPrivateKey(privateKey);

            enqueueSnackbar(message, {
                variant: "success",
            });

            router.push("/");
        } catch (e) {
            if (e instanceof Error) {
                enqueueSnackbar(e.message, {
                    variant: "error",
                });
            } else console.error(e);

            setDisabled(false);
        }
    };

    const verifyPassword = async () => {
        return await Authentication.checkPassword(user.email, password);
    };

    const login = async () => {
        return await Authentication.login(email, password);
    };

    return (
        <Grid container sx={{ minHeight: "100%" }}>
            <Grid item xs={12} md={4} sx={{ minHeight: "100%" }}>
                <Paper square sx={{ height: "100%" }}>
                    <VerticalCenter>
                        <Container>
                            <Grid container spacing={2}>
                                <Grid
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
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    {user ? (
                                        <UserComponent />
                                    ) : (
                                        <EmailTextField
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <PasswordTextField
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant={"contained"}
                                        disabled={disabled}
                                        onClick={() => auth()}
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
                        </Container>
                    </VerticalCenter>
                </Paper>
            </Grid>
            <Grid item sx={{ display: { xs: "none", md: "block" } }} md={8}>
                <VerticalCenter>
                    <Container>
                        <List>
                            {features.map(({ title, description, icon: Icon }, index) => (
                                <ListItem key={`feature-list-item-${index}`}>
                                    <ListItemIcon >
                                        <Icon fontSize={"large"} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={(
                                            <Typography variant={"h6"}>
                                                {title}
                                            </Typography>
                                        )}
                                        secondary={(
                                            <Typography variant={"body1"}>
                                                {description}
                                            </Typography>
                                        )}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Container>
                </VerticalCenter>
            </Grid>
        </Grid>
    );
};

export default SigninPage;