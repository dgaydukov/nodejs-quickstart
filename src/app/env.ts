/**
 * File with all env variables.
 * Done on purpose, so we never use process.env. anywhere in code and we can also set default values here
 */


export const APP_PORT = process.env.APP_PORT;
export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = process.env.SMTP_PORT;
export const SMTP_USE_SSL = process.env.SMTP_USE_SSL === 'true';
export const SMTP_USERNAME = process.env.SMTP_USERNAME;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
export const SENDER_EMAIL = process.env.SENDER_EMAIL;
export const SALT = process.env.SALT;
// expire time in days
export const USER_SESSION_EXPIRE_TIME = process.env.USER_SESSION_EXPIRE_TIME;
export const API_VERSION = process.env.API_VERSION;