const { createSecureHeaders } = require("next-secure-headers");

module.exports = {
    future: {
        webpack5: false,
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
};