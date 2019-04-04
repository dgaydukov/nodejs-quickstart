/**
 * Different small helper functions used across the project
 */

const crypto = require('crypto');

/**
 * Hash any message to sha256 hash
 * 
 * @param msg {string}
 */
export const sha256 = (msg: string): string => {
    return crypto.createHash('sha256').update(msg).digest('base64');
}

export const dblSha = (password: string): string => {
    return sha256(sha256(password));
}

export const validateEmail =(email: string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}