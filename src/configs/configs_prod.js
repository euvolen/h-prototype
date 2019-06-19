export  const {
    NODE_ENV,
    DB_USERNAME,
    DB_PASSWORD ,
    DB_HOST,
    DB_PORT,
    DB_NAME ,
    SESS_NAME ,
    SESS_SECRET,
    SESS_LIFETIME ,
    AES_32KEY,
    AES_256_CBC,
    APP_PASS,
    SECRET_OR_KEY,
    EMAIL
} = process.env
export const IN_PROD = NODE_ENV === 'production' 

