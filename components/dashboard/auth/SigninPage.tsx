import { Card, Container, CardContent, makeStyles, useMediaQuery } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import ResponsiveCard from "./SigninPage/ResponsiveCard";
import Image from "next/image";
import ScanQRCode from "./SigninPage/ScanQRCode";
import ShowUser from "./SigninPage/ShowUser";
import UnwrapPromise from "@lib/client/types/UnwrapPromise";
import Authentication from "@lib/client/api/Authentication";

type ProcessType = UnwrapPromise<typeof Authentication.start>
type StateType = UnwrapPromise<typeof Authentication.check>;

const SigninPage = () => {
    const [process, setProcess] = useState<ProcessType>();
    const [state, setState] = useState<StateType>();
    const classes = useStyles();

    const isLarge = useMediaQuery('(min-width:600px)');
    const Wrapper = isLarge ? Card : Fragment;

    const check = async (process: ProcessType) => {
        setState(await Authentication.check(process.id, process.secret));
        setTimeout(() => check(process), 3000);
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
                    <Image
                        src={"/img/logo.png"}
                        width={224}
                        height={40}
                    />
                </div>
                <Wrapper variant={"outlined"}>
                    <CardContent>
                        {!process && (
                            <ScanQRCode 
                                loading
                            />
                        )}
                        {(state?.message === "not_scanned_yet" || true) && !!process && (
                            <ScanQRCode 
                                value={process.id}
                            />
                        )}
                        {state.message === "scanned_but_not_verified" && (
                            <ShowUser 
                                onBack={async () => {
                                    setProcess(null);
                                    setState(null);
                                    await start();
                                }}
                                user={{
                                    name: state.data.user.username || "",
                                }}
                            />
                        )}
                    </CardContent>
                </Wrapper>
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
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(4),
        },
    },
    container: {
        height: "100%",
    },
}));

export default SigninPage;