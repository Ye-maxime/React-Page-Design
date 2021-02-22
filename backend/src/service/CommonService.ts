/* eslint-disable class-methods-use-this */
import path from 'path';
import fs from 'fs';

export default class CommonService {
  uploadFile(file: any): string {
    try {
      // 时间戳
      const timestamps = (new Date().getTime()).toString();
      // 扩展名
      const extname = path.extname(file.name);
      const pathName = path.join(__dirname, '../../public/upload_static/images');
      // 判断文件夹是否存在
      // eslint-disable-next-line no-unused-expressions
      fs.existsSync(pathName) || fs.mkdirSync(pathName, { recursive: true });
      // 创建可读流
      const readStream = fs.createReadStream(file.path);
      // 创建可写流
      const filePath = `${pathName}/${timestamps}${extname}`;
      const writeStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      readStream.pipe(writeStream);

      return `http://localhost:4000/upload_static/images/${timestamps}${extname}`;
    } catch (e) {
      console.log(e.message);
      return '';
    }
  }
}
