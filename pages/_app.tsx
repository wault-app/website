
import { AppProps } from "next/app";
import Head from "next/head";
import { createTheme, CssBaseline, NoSsr, ThemeProvider } from "@material-ui/core";
import DialogProvider from "@components/DialogProvider";

import "../public/css/fix-height.css";
import "../public/css/react-credit-card.css";
import FaviconList from "@components/FaviconList";
import MenuProvider from "@components/MenuProvider";

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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Head>
                <title>Wault</title>
                <meta charSet="utf-8" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <FaviconList />
            </Head>
            <NoSsr>
                <DialogProvider>
                    <MenuProvider>
                        <Component {...pageProps} />
                    </MenuProvider>
                </DialogProvider>
            </NoSsr>
        </ThemeProvider>
    );
};

export default MyApp;