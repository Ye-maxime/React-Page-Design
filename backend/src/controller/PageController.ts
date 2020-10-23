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
  getAll() {
    return this.pageService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.pageService.getOne(id);
  }

  // @Post("/users")
  // post(@Body() user: any) {
  //    return "Saving user...";
  // }

  // @Put("/users/:id")
  // put(@Param("id") id: number, @Body() user: any) {
  //    return "Updating a user...";
  // }

  // @Delete("/users/:id")
  // remove(@Param("id") id: number) {
  //    return "Removing user...";
  // }
}
