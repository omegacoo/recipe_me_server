module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://recipe_me@localhost/recipe_me',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://recipe_me@localhost/recipe_me_test',
    JWT_SECRET: 'u%3FgDR8&ljLnvYDluy5%T2Yd_##C#',
    JWT_EXPIRY_SECONDS: '900',
};