
import { AppProps } from "next/app";
import Head from "next/head";
import { CssBaseline, NoSsr } from "@material-ui/core";
import FaviconList from "@components/seo/FaviconList";
import { SnackbarProvider } from "notistack";
import NavigationBar from "@components/common/NavigationBar";
import AuthenticationProvider from "@components/providers/AuthenticationProvider";
import KeycardProvider from "@components/providers/KeycardProvider";
import DarkModeProvider from "@components/providers/ThemeProvider";
import { useRouter } from "next/router";
import RSAProvider from "@components/providers/RSAProvider";

import "../public/css/react-credit-card.css";
import "../public/css/fixes.css";

const NAVBAR_EXCLUDED = [
    "/auth/register/confirm",
    "/auth/signin",
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