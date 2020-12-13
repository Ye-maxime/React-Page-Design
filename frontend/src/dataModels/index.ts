// new 数据的模板
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { IBasicComponentConfig } from '../config/basicComponentConfig';
import {
  ICommonStyle, IElement, IPage, IProject,
} from '../store/editor/types';
import { createUUID } from '../common/utils';

const dict: Record<string, any> = {
  String: '',
  Array: [],
  Object: {},
  Boolean: false,
  Number: 0,
  // 待扩展数据类型
};

// 元素配置信息字段
export const elementConfig: IElement = {
  elementId: '',
  elementName: '',
  value: '', // 绑定值
  valueType: 'String', // 值类型
  events: [], // 事件
  commonStyle: {
    width: 80,
    height: 50,
    color: '#000000',
    zIndex: 1,
    fontSize: 16,
    top: 20,
    left: 20,
    rotate: 0,
  }, // 公共样式
  propsValue: {}, // 属性参数 都来自于以Rdp开头的组件中各自需要的某些属性
};

// 页面配置信息字段
export const pageConfig: IPage = {
  pageId: '',
  name: '',
  elements: [],
};

// 项目配置信息字段
export const projectConfig: IProject = {
  projectId: '',
  name: '',
  title: '未命名场景',
  description: '可视化编辑器',
  script: '',
  width: 375,
  height: 644,
  pages: [],
};

export const getElementConfig = (
  element: IBasicComponentConfig,
  extendStyle = {},
): IElement => {
  const elementData: IBasicComponentConfig = cloneDeep(element);
  const type = elementData.valueType || 'String'; // 默认string类型
  const elementConfigData = cloneDeep(elementConfig);
  const config: IElement = {
    ...elementConfigData,
    elementId: createUUID(),
    elementName: elementData.elementName,
    // propsValue: deepClone(elementData.needProps || {}),
  };
  // 样式
  config.commonStyle = merge(config.commonStyle, elementData.defaultStyle);
  config.commonStyle = merge(config.commonStyle, extendStyle);
  config.propsValue = merge(config.propsValue, elementData.propsValue);

  config.value = element.defaultValue || dict[type];
  config.valueType = type;
  return config;
};

export const getPageConfig = (): IPage =>
  //   return {
  //     pageId: createUUID(),
  //     name: '新页面' + Math.floor(Math.random() * 10),
  //     elements: [],
  //   };
  ({
    ...cloneDeep(pageConfig),
    pageId: createUUID(),
    name: `新页面${Math.floor(Math.random() * 100)}`,
  });
export const getProjectConfig = (): IProject => {
  const project = cloneDeep(projectConfig);
  project.projectId = createUUID();
  project.name = `新项目${Math.floor(Math.random() * 100)}`;
  const onePage = getPageConfig();
  project.pages.push(onePage);
  return project;
};

/**
 * 获取元素样式
 * @param styleObj
 * @param scalePoint 缩放比例
 */
export const getCommonStyle = (styleObj: ICommonStyle, scalingRatio = 1) => {
  const needUnitStr = [
    'width',
    'height',
    'top',
    'left',
    'paddingTop',
    'paddingLeft',
    'paddingRight',
    'paddingBottom',
    'marginTop',
    'marginLeft',
    'marginRight',
    'marginBottom',
    'borderWidth',
    'fontSize',
    'borderRadius',
    'letterSpacing',
  ];

  const style: Record<string, any> = {};
  const keyList = Object.keys(styleObj);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keyList) {
    if (needUnitStr.includes(key)) {
      style[key] = `${styleObj[key] * scalingRatio}px`;
    } else {
      style[key] = styleObj[key];
    }
  }
  style.transform = `rotate(${style.rotate}deg)`;
  return style;
};
