/**
 * Middleware to check auth on API requests
 */

import * as Koa from 'koa';
import AuthRepo from '../repo/authRepo';

export const AuthCheckMiddleware = async (ctx: Koa.Context, next: () => Promise<any>) => {
    let runCheck = true;
    const urlsWithoutAuth = ['/v1/auth'];
    urlsWithoutAuth.map(k => {
        if (ctx.req.url.indexOf(k) !== -1) {
            runCheck = false;
        }
    });
    if (runCheck) {
        const repo = new AuthRepo();
        await repo.checkAuth({ 
            userId: ctx.req.headers.userid, 
            authToken: ctx.req.headers.authtoken 
        });
    }
    await next();
}