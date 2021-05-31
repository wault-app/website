
import { AppProps } from "next/app";
import { Fragment } from "react";
import Head from "next/head";
import { createTheme, CssBaseline, NoSsr, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
    components: {
        MuiCardContent: {
            styleOverrides: {
                root: {
                    "&:last-child": {
                        paddingBottom: 16,
                    }
                }
            }
        }
    }
})

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Fragment>
            <CssBaseline />
            <Head>
                <title>Wault</title>
                <meta charSet="utf-8" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Head>
            <ThemeProvider theme={theme}>
                <NoSsr>    
                    <Component {...pageProps} />
                </NoSsr>
            </ThemeProvider>
        </Fragment>
    );
};

export default MyApp;