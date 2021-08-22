import { Container, CardContent, makeStyles, Typography, Grid, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import Logo from "@components/branding/Logo/Logo";
import VerticalCenter from "@components/common/VerticalCenter";
import { useSnackbar } from "notistack";
import ResponsiveCard from "@components/common/ResponsiveCard";
import { useUser } from "@components/providers/AuthenticationProvider";
import RedirectInProgressScreen from "@components/common/RedirectInProgressScreen";
import Authentication from "@lib/api/Authentication";
import { useRouter } from "next/router";
import { useRSA } from "@components/providers/RSAProvider";
import User from "@lib/api/User";
import UserComponent from "@components/user/UserComponent";

const SigninPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    
    const { setPrivateKey, setPublicKey, privateKey } = useRSA();
    const { user, setUser } = useUser();

    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const classes = useStyles();

    const isDisabled = disabled || !password || (!email && !user);

    if(user && privateKey) {
        router.push("/");
        
        return (
            <RedirectInProgressScreen />
        );
    }

    const auth = () => {
        if(isDisabled) return;

        if(user) {
            verifyPassword();
        } else {
            logIn();
        }
    };

    const verifyPassword = async () => {
        setDisabled(true);

        try {
            const { message, rsa } = await Authentication.checkPassword(user.email, password);
        
            enqueueSnackbar(message, {
                variant: "success",
            });

            setPrivateKey(rsa.private);
            setPublicKey(rsa.public);

            router.push("/");
        } catch(e) {
            enqueueSnackbar(e.message, {
                variant: "error",
            });

            setDisabled(false);
        }
    };


    const logIn = async () => {
        setDisabled(true);

        try {
            const resp = await Authentication.login(email, password);
            
            const user = await User.get();
            setUser(user);
            
            setPublicKey(resp.rsa.public);
            setPrivateKey(resp.rsa.private);

            enqueueSnackbar(resp.message, {
                variant: "success",
            });

            router.push("/");
        } catch(e) {
            enqueueSnackbar(e.message, {
                variant: "error",
            });

            setDisabled(false);
        }
    };

    return (
        <Container maxWidth={"sm"} className={classes.container}>
            <VerticalCenter>
                <div className={classes.logo}>
                    <Logo />
                </div>
                <ResponsiveCard>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    variant={"h5"}
                                >
                                    Log in
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
                                    fullWidth
                                    variant={"contained"}
                                    disabled={isDisabled}
                                    onClick={auth}
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

const useStyles = makeStyles((theme) => ({
    logo: {
        textAlign: "center",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        maxWidth: "100%",
        width: 300,
        marginLeft: "auto",
        marginRight: "auto",
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(4),
        },
    },
    container: {
        height: "100%",
    },
}));

export default SigninPage;