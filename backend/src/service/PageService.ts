import { getMongoRepository } from 'typeorm';
import { Page } from '../entity/Page';

export class PageService {
  async getPages() {
    const pageRepository = getMongoRepository(Page);
    const page1 = await pageRepository.findOne({
      name: '页面1',
    });
    return page1;
  }

  getPage(id: number) {
    return 'This action returns page #' + id;
  }

  async addPage(page: Page) {
    // const newPage = new Page();
    // newPage.pageId = page.pageId;
    // newPage.name = page.name;
    // newPage.elements = [];

    const pageRepository = getMongoRepository(Page);
    const newPage = await pageRepository.save(page);
    // 过滤掉id
    const { id, ...res } = newPage;
    return res;
  }

  async updatePage(id: string, page: Page) {
    const pageRepository = getMongoRepository(Page);
    const res = await pageRepository.update({ pageId: id }, page);
    // const res = await pageRepository.update(
    //   { pageId: id },
    //   { name: page.name, elements: page.elements }
    // );
    return res;
  }
}
