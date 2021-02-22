import Koa from 'koa';
import KoaBody from 'koa-body';
import Cors from '@koa/cors';
import KoaStatic from 'koa-static';
import path from 'path';
import 'reflect-metadata'; // this shim is required
import { useKoaServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import connection from './database/connection';

const app = new Koa();
// 配置静态web 这样可通过http://localhost:4000/upload_static/images/1608491937091.png 直接访问到后端图片
app.use(KoaStatic(path.join(__dirname, '../public'))); // 访问http://localhost:4000/ 等价于访问 backend/public/ 目录
// before useKoaServer!!
app.use(Cors());
app.use(KoaBody({
  multipart: true, // 支持文件上传
}));

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
