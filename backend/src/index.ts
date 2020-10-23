import Koa from 'koa';
import KoaBody from 'koa-body';
import Cors from '@koa/cors';
import 'reflect-metadata'; // this shim is required
import { useKoaServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import connection from './database/connection';

// its important to set container before any operation you do with routing-controllers,
// including importing controllers
useContainer(Container);

const app = new Koa();
useKoaServer(app, {
  routePrefix: '/api',
  controllers: [__dirname + '/controller/*.ts'], // we specify controllers we want to use
});

app.use(Cors());
app.use(KoaBody());
// app.listen(4000);

connection
  .then(() => app.listen(4000))
  .catch(console.error);

// eslint-disable-next-line no-console
console.log('Server running on port 4000');
