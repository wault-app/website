
import { AppProps } from "next/app";
import Head from "next/head";
import { CssBaseline, NoSsr } from "@material-ui/core";
import FaviconList from "@components/FaviconList";
import { SnackbarProvider } from "notistack";
import NavigationBar from "@components/NavigationBar";
import AuthenticationProvider from "@components/AuthenticationProvider/AuthenticationProvider";
import KeycardProvider from "@components/KeycardProvider";
import DarkModeProvider from "@components/ThemeProvider";
import { useRouter } from "next/router";
import RSAProvider from "@components/RSAProvider";

import "../public/css/react-credit-card.css";
import "../public/css/fixes.css";

const NAVBAR_EXCLUDED = [
    "/auth/signin",
    "/auth/register",
    "/auth/register/confirm",
];

const MyApp = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();

    return (
        <DarkModeProvider>
            <Head>
                <meta charSet="utf-8" />
                <title>Wault</title>
                <FaviconList />
            </Head>
            <CssBaseline />
            <SnackbarProvider>
                <NoSsr>
                    <RSAProvider>
                        <AuthenticationProvider>
                            {NAVBAR_EXCLUDED.includes(router.pathname) ? (
                                <Component {...pageProps} />
                            ) : (
                                <NavigationBar>
                                    <KeycardProvider>
                                        <Component {...pageProps} />
                                    </KeycardProvider>
                                </NavigationBar>
                            )}
                        </AuthenticationProvider>
                    </RSAProvider>
                </NoSsr>
            </SnackbarProvider>
        </DarkModeProvider>
    );
};

export default MyApp;