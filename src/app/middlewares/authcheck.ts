/**
 * Middleware to check auth on API requests
 */

import * as Koa from 'koa';
import AuthRepo from '../repo/authRepo';
import { API_VERSION } from '../env';

export const AuthCheckMiddleware = async (ctx: Koa.Context, next: () => Promise<any>) => {
    let runCheck = true;
    const whitelist = [
        API_VERSION,
        `${API_VERSION}/swagger`,
        `${API_VERSION}/auth/*`,
    ];
    whitelist.map(k => {
        if (ctx.req.url.match(k) !== null) {
            runCheck = false;
        }
    });
    // if (runCheck) {
    //     const repo = new AuthRepo();
    //     await repo.checkAuth({ 
    //         userId: ctx.req.headers.userid, 
    //         authToken: ctx.req.headers.authtoken 
    //     });
    // }
    await next();
}