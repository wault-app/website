import { Card, Container, CardContent, makeStyles, useMediaQuery } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import Logo from "@components/branding/Logo";
import dynamic from "next/dynamic";
import ResponsiveCard from "./SigninPage/ResponsiveCard";
import ScanQRCode from "./SigninPage/ScanQRCode";
import UnwrapPromise from "@lib/client/types/UnwrapPromise";
import Authentication from "@lib/client/api/Authentication";
import EncryptionKey from "@lib/client/encryption/EncryptionKey"; 
import { useSnackbar } from "notistack";
import VaultCard from "../vault/VaultCard";

const ShowUser = dynamic(() => import ("./SigninPage/ShowUser"));

type ProcessType = UnwrapPromise<typeof Authentication.start>
type StateType = UnwrapPromise<typeof Authentication.check>;

export type SigninPageProps = {
    onAuth: () => void;
};

const SigninPage = ({ onAuth }: SigninPageProps) => {
    const [process, setProcess] = useState<ProcessType>();
    const [state, setState] = useState<StateType>();
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const check = async (process: ProcessType) => {
        try {
            // check for updates from the remote server
            const resp = await Authentication.check(process.id, process.secret)
            
            // update the state for renderer
            setState(resp);
            
            // if we recieved the encryption keys, then store them
            // idea: use the KeyExchange API and depract it from the registration process
            if(resp.message === "scanned_and_verified") {
                // show a snackbar for 
                enqueueSnackbar("Successful authentication!", { variant: "success" });
                
                // remove previously stored data due to logout bug
                setState(null);
                setProcess(null);

                // call given callback function
                onAuth();

                // stop checking for response after authentication was successful
                return;
            }
        } catch(e) {
            // handle error
            enqueueSnackbar(e.message, {
                variant: "error",
            });
        }

        // if not yet scanned, then check again after 0.5 sec
        setTimeout(() => check(process), 500);
    };

    const start = async () => {
        const process = await Authentication.start();
        setProcess(process);
        await check(process);
    };    

    useEffect(() => {
        start();    
    }, []);

    return (
        <Container maxWidth={"sm"} className={classes.container}>
            <ResponsiveCard>
                <div className={classes.logo}>
                    <Logo />
                </div>
                <VaultCard>
                    <CardContent>
                        {!process && (
                            <ScanQRCode 
                                loading
                            />
                        )}
                        {(!state || state?.message === "not_scanned_yet") && !!process && (
                            <ScanQRCode 
                                image={process.image}
                            />
                        )}
                        {state?.message === "scanned_but_not_verified" && (
                            <ShowUser 
                                onBack={async () => {
                                    setProcess(null);
                                    setState(null);
                                    await start();
                                }}
                                user={{
                                    name: state.user.username || "",
                                }}
                            />
                        )}
                    </CardContent>
                </VaultCard>
            </ResponsiveCard>
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