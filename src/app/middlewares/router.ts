

import * as Koa from 'koa';
import * as Router from 'koa-router';
import authRouter from '../api/auth.controller';

const router = new Router({
    prefix: '/v1.0'
});

router.get('/', async (ctx: Koa.Context) => {
    ctx.body = 'Node.js Quickstart v1';
});

router.use(authRouter.routes(), authRouter.allowedMethods());


export const RouterMiddleware = router.routes();