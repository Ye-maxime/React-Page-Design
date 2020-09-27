import * as Koa from 'koa';
import * as Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx: Koa.Context) => {
  ctx.body = 'Page';
});

export default router.routes();
