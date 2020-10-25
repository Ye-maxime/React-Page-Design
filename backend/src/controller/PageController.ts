import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from 'routing-controllers';
import { PageService } from '../service/PageService';

// https://github.com/typestack/routing-controllers
@Controller('/pages')
export class PageController {
  // 依赖注入
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
  addPage(@Body() page: any) {
    return this.pageService.addPage(page);
  }

  @Post('/update/:id')
  updatePage(@Param('id') id: string, @Body() page: any) {
    return this.pageService.updatePage(id, page);
  }

  // @Delete("/users/:id")
  // remove(@Param("id") id: number) {
  //    return "Removing user...";
  // }
}
