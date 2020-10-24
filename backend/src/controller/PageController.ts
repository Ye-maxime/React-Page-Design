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
    return this.pageService.getAll();
  }

  @Get('/:id')
  getPage(@Param('id') id: number) {
    return this.pageService.getOne(id);
  }

  // @Post("/users")
  // post(@Body() user: any) {
  //    return "Saving user...";
  // }

  @Post('/add')
  addPage(@Body() page: any) {
    console.log('server add page = ', page);
    return 'Saving a page...';
  }

  @Put('/update/:id')
  updatePage(@Param('id') id: number, @Body() page: any) {
    console.log('server update page = ', page);
    return 'Updating a page...';
  }

  // @Delete("/users/:id")
  // remove(@Param("id") id: number) {
  //    return "Removing user...";
  // }
}
