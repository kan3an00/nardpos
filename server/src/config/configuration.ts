export default () => ({
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
    jwtSecret: process.env.JWT_SECRET,
});