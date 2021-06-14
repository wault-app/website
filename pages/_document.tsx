import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import crypto from 'crypto';
import { v4 } from 'uuid';

// import theme from '@utils/theme';

/**
 * Generate Content Security Policy for the app.
 * Uses randomly generated nonce (base64)
 *
 * @returns [csp: string, nonce: string] - CSP string in first array element, nonce in the second array element.
 */
const generateCsp = (): [csp: string, nonce: string] => {
    const production = process.env.NODE_ENV === 'production';

    // generate random nonce converted to base64. Must be different on every HTTP page load
    const hash = crypto.createHash('sha256');
    hash.update(v4());
    const nonce = hash.digest('base64');

    let csp = [
        `default-src 'self'`,
        `base-uri 'self'`,
        `style-src https://fonts.googleapis.com 'self' ${production ? `'nonce-${nonce}'` : "'unsafe-inline'"}`,
        `script-src 'nonce-${nonce}' 'self'`,
        `font-src https://fonts.gstatic.com`,
        `img-src 'self' data:`,
    ];

    if (!production) csp.push(`connect-src 'self'`);

    return [csp.join(";"), nonce];
};

export default class MyDocument extends Document {
    render(): JSX.Element {
        const [csp, nonce] = generateCsp();

        return (
            <Html lang='en'>
                <Head nonce={nonce}>
                    {/* PWA primary color */}
                    {/* <meta name='theme-color' content={theme.palette.primary.main} /> */}
                    <meta property='csp-nonce' content={nonce} />
                    <meta httpEquiv='Content-Security-Policy' content={csp} />
                    <link
                        rel='stylesheet'
                        href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript nonce={nonce} />
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};