// 主页面左边栏组件库
// https://github.com/huangwei9527/quark-h5/blob/master/client/pages/editor/components/component-libs/Index.vue
import * as React from 'react';
import RdpComponent from './RdpComponent';
import './css/App.scss';

const ComponentLibs = () => {
  const componentsList = [
    {
      elName: 'rpd-text',
      title: '文字',
      icon: 'iconfont iconwenben',
      // 每个组件设置props来展示哪些显示哪些编辑项
    //   valueType: '', // 标识数据类型，用于表单组件
    //   defaultStyle: {
    //     height: 40,
    //   },
    },
    {
      elName: 'rpd-button',
      title: '按钮',
      icon: 'iconfont iconanniuzu',
      // 每个组件设置props来展示哪些显示哪些编辑项
    //   valueType: '', // 标识数据类型，用于表单组件
    //   defaultStyle: {
    //     width: 140,
    //     height: 40,
    //     paddingTop: 10,
    //     paddingBottom: 10,
    //     borderColor: '#999999',
    //     borderStyle: 'solid',
    //     borderWidth: 1,
    //     borderRadius: 4,
    //   },
    },
  ];

  return (
    <div className="components-libs-wrapper scrollbar-wrapper">
      <p className="page-title">组件库</p>
      <ul className="scrollbar-wrapper">
        {componentsList.map((component) => (
          <RdpComponent
            key={component.elName}
            title={component.title}
            icon={component.icon}
          />
        ))}
      </ul>
    </div>
  );
};

export default ComponentLibs;
