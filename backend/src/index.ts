import * as Koa from 'koa';
import * as KoaBody from 'koa-body';
import * as Router from 'koa-router';
import * as Cors from '@koa/cors';
import routesFn from './routes';

const app = new Koa();
const router = new Router();
routesFn(router);

app.use(Cors());
app.use(KoaBody());
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000);

// eslint-disable-next-line no-console
console.log('Server running on port 4000');
