import Koa from 'koa';
import KoaBody from 'koa-body';
import Cors from '@koa/cors';
import path from 'path';
import 'reflect-metadata'; // this shim is required
import { useKoaServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import connection from './database/connection';

const app = new Koa();
// before useKoaServer!!
app.use(Cors());
app.use(KoaBody());

// its important to set container before any operation you do with routing-controllers,
// including importing controllers
useContainer(Container);
useKoaServer(app, {
  routePrefix: '/api',
  controllers: [path.join(__dirname, '/controller/*.ts')], // we specify controllers we want to use
  //   validation: false,
});

connection.then(() => app.listen(4000)).catch(console.error);

// eslint-disable-next-line no-console
console.log('Server running on port 4000');
