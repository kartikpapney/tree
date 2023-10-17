import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    ip: process.env.NODE_SERVER_IP || 'localhost',
    port: process.env.NODE_SERVER_PORT || 5000,
    allowedOrigin: "*",
    allowedMethod: ['GET', 'POST', 'OPTIONS'],
    origin: "*",
    db: process.env.DB,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbDialect: process.env.DB_DIALECT
}

export const HTTP = {
    timeout: 408,
    notAvailable: 503,
    notFound: 404,
    badRequest: 400,
    noContent :204,
    ok: 200
}