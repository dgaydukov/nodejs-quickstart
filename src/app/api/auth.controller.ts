import * as Koa from 'koa';
import * as Router from 'koa-router';
import UserRepo from '../repo/userRepo';

const routerOpts: Router.IRouterOptions = {
  prefix: '/auth',
};

const router: Router = new Router(routerOpts);

router.post('/signup', async (ctx: Koa.Context) => {
  const repo = new UserRepo();
  ctx.body = await repo.signUp(ctx.request.body, ctx.request.origin);
});

router.post('/signin', async (ctx: Koa.Context) => {
  const repo = new UserRepo();
  ctx.body = await repo.signIn(ctx.request.body.username, ctx.request.body.password);
});

router.post('/verify/:token', async (ctx: Koa.Context) => {
  const repo = new UserRepo();
  ctx.body = await repo.verify(ctx.params.token);
});

export default router;