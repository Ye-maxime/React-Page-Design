import { ICommonStyle } from '../store/editor/types';

export interface IBasicComponentConfig {
  elementName: string
  title: string // 绑定值
  icon: string // 值类型
  defaultValue: string
  valueType: string
  defaultStyle?: ICommonStyle
}

// 左侧导航栏基本组件列表
const componentsList: IBasicComponentConfig[] = [
  {
    elementName: 'rpd-text',
    title: '文字',
    icon: 'far fa-edit',
    defaultValue: '文字',
    // 每个组件设置props来展示哪些显示哪些编辑项
    valueType: '', // 标识数据类型，用于表单组件
    defaultStyle: {
      height: 40,
    },
  },
  {
    elementName: 'rpd-button',
    title: '按钮',
    icon: 'far fa-keyboard',
    defaultValue: '按钮',
    // 每个组件设置props来展示哪些显示哪些编辑项
    valueType: '', // 标识数据类型，用于表单组件
    defaultStyle: {
      width: 140,
      height: 40,
    },
  },
];

export default componentsList;
