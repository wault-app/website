
import { AppProps } from "next/app";
import { Fragment } from "react";
import Head from "next/head";
import { CssBaseline, NoSsr } from "@material-ui/core";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Fragment>
            <CssBaseline />
            <Head>
                <title>Wault</title>
                <meta charSet="utf-8" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Head>
            <NoSsr>
                <Component {...pageProps} />
            </NoSsr>
        </Fragment>
    );
};

export default MyApp;