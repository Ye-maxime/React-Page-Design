// new 数据的模板
import { cloneDeep, merge } from 'lodash';
import { IBasicComponentConfig } from '../config/basicComponentConfig';
import { IElement } from '../store/editor/types';
import { createUUID } from '../common/utils';

const dict: any = {
  String: '',
  Array: [],
  Object: {},
  Boolean: false,
  Number: 0,
  // 待扩展数据类型
};

// 元素配置信息字段
const elementConfig: IElement = {
  // elementId: '2',
  elementName: '',
  value: '', // 绑定值
  valueType: 'String', // 值类型
  events: [], // 事件
  commonStyle: {
    width: 80,
    height: 50,
    color: '#000000',
    zIndex: 1,
  }, // 公共样式
};

const getElementConfig = (element: IBasicComponentConfig, extendStyle = {}): IElement => {
  const elementData: IBasicComponentConfig = cloneDeep(element);
  const type = elementData.valueType || 'String'; // 默认string类型
  const elementConfigData = cloneDeep(elementConfig);
  const config: IElement = {
    elementId: createUUID(),
    ...elementConfigData,
    elementName: elementData.elementName,
    // propsValue: deepClone(elementData.needProps || {}),
  };
  // 样式
  config.commonStyle = merge(config.commonStyle, elementData.defaultStyle);
  config.commonStyle = merge(config.commonStyle, extendStyle);

  config.value = element.defaultValue || dict[type];
  config.valueType = type;
  return config;
};

export {
  elementConfig,
  getElementConfig,
};
