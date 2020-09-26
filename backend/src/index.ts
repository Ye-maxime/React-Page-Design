import * as Koa from 'koa';
import * as Router from 'koa-router';

const app = new Koa();
// const router = new Router();

// routes 参考https://tmk.im/post/ts-koa/
app.use(async (ctx) => {
  ctx.body = 'Hello, world!';
});

// router.get('/*', async (ctx) => {
//     ctx.body = 'Hello World!';
// });

// app.use(router.routes());

app.listen(4000);

console.log('Server running on port 3000');
