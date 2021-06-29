
import { AppProps } from "next/app";
import Head from "next/head";
import { createMuiTheme as createTheme, CssBaseline, NoSsr, ThemeProvider } from "@material-ui/core";
import DialogProvider from "@components/providers/DialogProvider";
import FaviconList from "@components/seo/FaviconList";
import MenuProvider from "@components/providers/MenuProvider";
import { SnackbarProvider } from "notistack";
import NavigationBar from "@components/dashboard/global/NavigationBar";
import { Fragment } from "react";
import AuthenticationProvider from "@components/providers/AuthenticationProvider";
import KeycardProvider from "@components/providers/KeycardProvider";

const theme = createTheme({
    props: {
        MuiTextField: {
            variant: "filled",
        },
    },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
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
                <NoSsr>
                    <AuthenticationProvider>
                        <Wrapper>
                            <KeycardProvider>
                                <DialogProvider>
                                    <MenuProvider>
                                        <Component {...pageProps} />
                                    </MenuProvider>
                                </DialogProvider>
                            </KeycardProvider>
                        </Wrapper>
                    </AuthenticationProvider>
                </NoSsr>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default MyApp;