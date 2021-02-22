/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Context } from 'koa';
import {
  Controller, Post, Ctx,
} from 'routing-controllers';
import CommonService from '../service/CommonService';

@Controller('/common')
export default class CommonController {
  // 依赖注入
  // eslint-disable-next-line no-useless-constructor
  constructor(private commonService: CommonService) {}

  @Post('/uploadFile')
  uploadFile(@Ctx() context: Context) {
    return this.commonService.uploadFile(context.request.files!.file);
  }
}
