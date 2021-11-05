const { createSecureHeaders } = require("next-secure-headers");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
    i18n: {
        // These are all the locales you want to support in
        // your application
        locales: ["en"],
        // This is the default locale you want to be used when visiting
        // a non-locale prefixed path e.g. `/hello`
        defaultLocale: "en",
    },
    async headers() {
        return [{
            source: "/(.*)",
            headers: createSecureHeaders({
                forceHTTPSRedirect: [true, { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true }],
                referrerPolicy: "same-origin",
            })
        }];
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [{
                loader: '@svgr/webpack',
                options: {
                    svgoConfig: {
                        plugins: [
                            { removeViewbox: false },
                        ],
                    },
                },
            }],
        });

        return config;
    },
});