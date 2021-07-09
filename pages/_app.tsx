
import { AppProps } from "next/app";
import Head from "next/head";
import { CssBaseline, NoSsr } from "@material-ui/core";
import FaviconList from "@components/seo/FaviconList";
import { SnackbarProvider } from "notistack";
import NavigationBar from "@components/dashboard/global/NavigationBar";
import { Fragment } from "react";
import AuthenticationProvider from "@components/providers/AuthenticationProvider";
import KeycardProvider from "@components/providers/KeycardProvider";
import DarkModeProvider from "@components/providers/ThemeProvider";
import SearchProvider from "@components/dashboard/search/SearchProvider";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const Wrapper = true ? NavigationBar : Fragment;

    return (
        <DarkModeProvider>
            <Head>
                <meta charSet="utf-8" />
                <title>Wault</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="/css/react-credit-card.css" />
                <link rel="stylesheet" href="/css/fixes.css" />
                <FaviconList />
            </Head>
            <CssBaseline />
            <SnackbarProvider>
                <SearchProvider>
                    <NoSsr>
                        <AuthenticationProvider>
                            <Wrapper>
                                <KeycardProvider>
                                    <Component {...pageProps} />
                                </KeycardProvider>
                            </Wrapper>
                        </AuthenticationProvider>
                    </NoSsr>
                </SearchProvider>
            </SnackbarProvider>
        </DarkModeProvider>
    );
};

export default MyApp;