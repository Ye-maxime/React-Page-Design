/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from 'routing-controllers';
import Page from '../entity/Page';
import PageService from '../service/PageService';

// https://github.com/typestack/routing-controllers
@JsonController('/pages')
export default class PageController {
  // 依赖注入
  // eslint-disable-next-line no-useless-constructor
  constructor(private pageService: PageService) {}

  @Get('/')
  getPages() {
    return this.pageService.getPages();
  }

  @Get('/:id')
  getPage(@Param('id') id: number) {
    return this.pageService.getPage(id);
  }

  @Post('/add')
  addPage(@Body() page: Page) {
    return this.pageService.addPage(page);
  }

  @Post('/update/:id')
  updatePage(@Param('id') id: string, @Body() page: Page) {
    return this.pageService.updatePage(id, page);
  }

  // @Delete("/users/:id")
  // remove(@Param("id") id: number) {
  //    return "Removing user...";
  // }
}
