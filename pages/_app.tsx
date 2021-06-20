
import { AppProps } from "next/app";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import DialogProvider from "@components/DialogProvider";
import FaviconList from "@components/FaviconList";
import MenuProvider from "@components/MenuProvider";
import { SnackbarProvider } from "notistack";
import NavigationBar from "@components/dashboard/global/NavigationBar";
import { Fragment } from "react";
import AuthenticationProvider from "@components/providers/AuthenticationProvider";

const theme = createTheme({});

const MyApp = ({ Component, pageProps, router }: AppProps) => {
    const Wrapper = true ? NavigationBar : Fragment;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Head>
                <title>Wault</title>
                <meta charSet="utf-8" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="/css/react-credit-card.css" />
                <link rel="stylesheet" href="/css/fixes.css" />
                <FaviconList />
            </Head>
            <SnackbarProvider>
                <DialogProvider>
                    <MenuProvider>
                        <AuthenticationProvider>
                            <Wrapper>
                                <Component {...pageProps} />
                            </Wrapper>
                        </AuthenticationProvider>
                    </MenuProvider>
                </DialogProvider>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default MyApp;