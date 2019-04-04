require('dotenv').config()

import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import databaseConnection from './db';
import { ErrorMiddleware } from './middlewares/error';
import { SwaggerMiddleware } from './middlewares/swagger';
import { AuthCheckMiddleware } from './middlewares/authcheck';
import { StaticServerMiddleware } from './middlewares/static-server';
import { RouterMiddleware } from './middlewares/router';

const app = new Koa();

app.use(bodyParser());
app.use(StaticServerMiddleware);
app.use(ErrorMiddleware);
app.use(SwaggerMiddleware);
app.use(AuthCheckMiddleware);
app.use(RouterMiddleware);

/**
 * Run all migration from source code and spart app
 */
databaseConnection.then(async (connection) => {
    await connection.runMigrations();
    await app.listen(process.env.APP_PORT);
    console.log('nodejs-quickstart is running...');
}).catch(console.log);