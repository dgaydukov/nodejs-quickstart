require('dotenv').config()

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as Serve from 'koa-static';
import * as Mount from 'koa-mount';
import * as HttpStatus from 'http-status-codes';
import authRouter from './api/auth.controller';
import databaseConnection from './db';
import AuthRepo from './repo/authRepo';

const app = new Koa();
const router = new Router({
    prefix: '/v1.0'
});

/**
 * by default koa-static serve directory content to root url /, so we use
 * koa-mount to mount this static to desired url, in our case /public
 */
app.use(Mount('/public', Serve(__dirname + '/../../public')));

app.use(bodyParser());

app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
        await next();
    } catch (error) {
        ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
        error.status = ctx.status;
        ctx.body = { error };
        ctx.app.emit('error', error, ctx);
    }
});

router.get('/', async (ctx: Koa.Context) => {
    ctx.body = 'Node.js Quickstart v1';
});


const koaSwagger = require('koa2-swagger-ui');
app.use(
    koaSwagger({
        routePrefix: '/v1/swagger',
        swaggerOptions: {
            url: '/public/swagger.json',
        },
    }),
);



router.use(authRouter.routes(), authRouter.allowedMethods());
/**
 * Authentication check
 */
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
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
});

app.use(router.routes());


databaseConnection.then(async (connection) => {
    await connection.runMigrations();
    await app.listen(process.env.APP_PORT);
    console.log('nodejs-quickstart is running...');
}).catch(console.log);