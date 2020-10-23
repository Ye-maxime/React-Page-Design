import { getMongoRepository } from 'typeorm';
import { Page } from '../entity/Page';

export class PageService {
  async getAll() {
    const pageRepository = getMongoRepository(Page);
    const page1 = await pageRepository.findOne({
      name: '页面1',
    });
    return page1;
  }

  getOne(id: number) {
    return 'This action returns page #' + id;
  }
}
