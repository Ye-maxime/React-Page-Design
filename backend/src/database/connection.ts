import { createConnection } from 'typeorm';
import { Page } from '../entity/Page';
import { Element } from '../entity/Element';
import { CommonStyle } from '../entity/CommonStyle';

// createConnection方法会自动读取来自ormconfig.json文件或环境变量中的连接选项
const connection: Promise<unknown> = createConnection()
  .then(async (connection) => {
    const commonStyle = new CommonStyle();
    commonStyle.width = 200;
    commonStyle.height = 200;
    commonStyle.color = '#000000';
    commonStyle.zIndex = 0;

    const element1 = new Element();
    element1.elementName = '按钮';
    element1.commonStyle = commonStyle;

    const element2 = new Element();
    element2.elementName = '文字';

    const page = new Page();
    page.name = '页面1';
    page.elements = [element1, element2];

    await connection.mongoManager.save(page);
    console.log('Page has been saved: ', page);

    const loadedPages = await connection.mongoManager.find(Page);
    console.log('Loaded pages from the database: ', loadedPages);
  })
  .catch((error) => console.log('Error: ', error));

export default connection;
