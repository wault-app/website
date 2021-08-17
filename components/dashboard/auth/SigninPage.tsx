import { Container, CardContent, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import Logo from "@components/branding/Logo";
import dynamic from "next/dynamic";
import VerticalCenter from "@components/common/VerticalCenter";
import ScanQRCode from "./SigninPage/ScanQRCode";
import UnwrapPromise from "@lib/types/UnwrapPromise";
import Authentication from "@lib/api/Authentication";
import { useSnackbar } from "notistack";
import ResponsiveCard from "@components/common/ResponsiveCard";

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
            if(resp.message === "remote_auth_success") {
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
            <VerticalCenter>
                <div className={classes.logo}>
                    <Logo />
                </div>
                <ResponsiveCard>
                    <CardContent>
                        {!process && (
                            <ScanQRCode 
                                loading
                            />
                        )}
                        {(!state || state?.message === "remote_auth_not_scanned") && !!process && (
                            <ScanQRCode 
                                image={process.image}
                            />
                        )}
                        {state?.message === "remote_auth_scanned" && (
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