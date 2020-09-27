import * as Router from 'koa-router';
import pageRoutes from './page';

export default (router: Router): void => {
  router.prefix('/api');
  router.use('/page', pageRoutes);
};
