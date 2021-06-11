
import { AppProps } from "next/app";
import Head from "next/head";
import { createMuiTheme, CssBaseline, NoSsr, ThemeProvider } from "@material-ui/core";
import DialogProvider from "@components/DialogProvider";

import "../public/css/fixes.css";
import "../public/css/react-credit-card.css";
import FaviconList from "@components/FaviconList";
import MenuProvider from "@components/MenuProvider";
import { SnackbarProvider } from "notistack";
import NavigationBar from "@components/dashboard/global/NavigationBar";
import { Fragment } from "react";

const theme = createMuiTheme({});

const MyApp = ({ Component, pageProps, router }: AppProps) => {
    const Wrapper = true ? NavigationBar : Fragment;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Head>
                <title>Wault</title>
                <meta charSet="utf-8" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <FaviconList />
            </Head>
            <SnackbarProvider>
                <DialogProvider>
                    <MenuProvider>
                        <Wrapper>
                            <Component {...pageProps} />
                        </Wrapper>
                    </MenuProvider>
                </DialogProvider>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default MyApp;