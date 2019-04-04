require('dotenv').config()

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as Serve from 'koa-static';
import * as Mount from 'koa-mount';
import authRouter from './api/auth.controller';
import databaseConnection from './db';
import {errorMiddleware} from './middlewares/error';
import {swaggerMiddleware} from './middlewares/swagger';
import {authCheckMiddleware} from './middlewares/authcheck';

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

app.use(errorMiddleware);

router.get('/', async (ctx: Koa.Context) => {
    ctx.body = 'Node.js Quickstart v1';
});

app.use(swaggerMiddleware);



router.use(authRouter.routes(), authRouter.allowedMethods());
/**
 * Authentication check
 */
app.use(authCheckMiddleware);

app.use(router.routes());


databaseConnection.then(async (connection) => {
    await connection.runMigrations();
    await app.listen(process.env.APP_PORT);
    console.log('nodejs-quickstart is running...');
}).catch(console.log);