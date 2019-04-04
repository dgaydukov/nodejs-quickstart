require('dotenv').config()

import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import databaseConnection from './db';
import {errorMiddleware} from './middlewares/error';
import {swaggerMiddleware} from './middlewares/swagger';
import {authCheckMiddleware} from './middlewares/authcheck';
import {StaticServerMiddleware} from './middlewares/static-server';
import {RouterMiddleware} from './middlewares/router';

const app = new Koa();


app.use(StaticServerMiddleware);
app.use(bodyParser());
app.use(errorMiddleware);
app.use(swaggerMiddleware);
app.use(authCheckMiddleware);
app.use(RouterMiddleware);


databaseConnection.then(async (connection) => {
    await connection.runMigrations();
    await app.listen(process.env.APP_PORT);
    console.log('nodejs-quickstart is running...');
}).catch(console.log);