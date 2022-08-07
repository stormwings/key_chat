import dotenv from 'dotenv';

dotenv.config();

const config = {
    dbUrl: process.env.DB_URL,
    port: process.env.PORT || '8000',
    host: process.env.HOST || 'http://localhost',
    publicRoute: process.env.PUBLIC_ROUTE || '/app',
    filesRoute: process.env.FILES_ROUTE || 'files'
};

export default config;
