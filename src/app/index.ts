require('dotenv').config()

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import authRouter from './api/auth.controller';
import databaseConnection from './db';
import {errorMiddleware} from './middlewares/error';
import {swaggerMiddleware} from './middlewares/swagger';
import {authCheckMiddleware} from './middlewares/authcheck';
import {StaticServerMiddleware} from './middlewares/static-server';

const app = new Koa();
const router = new Router({
    prefix: '/v1.0'
});
router.get('/', async (ctx: Koa.Context) => {
    ctx.body = 'Node.js Quickstart v1';
});
router.use(authRouter.routes(), authRouter.allowedMethods());

app.use(StaticServerMiddleware);
app.use(bodyParser());
app.use(errorMiddleware);
app.use(swaggerMiddleware);
app.use(authCheckMiddleware);
app.use(router.routes());


databaseConnection.then(async (connection) => {
    await connection.runMigrations();
    await app.listen(process.env.APP_PORT);
    console.log('nodejs-quickstart is running...');
}).catch(console.log);