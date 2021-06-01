const config = {
    secrets: {
        jwt: {
            privateKey: process.env.JWT_PRIVATE_KEY,
        },
        database: {
            url: process.env.DATABASE_URL,   
        },
    },
};

export default config;