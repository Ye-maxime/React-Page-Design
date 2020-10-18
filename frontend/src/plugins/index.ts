/* eslint-disable max-len */
import * as React from 'react';
import { EditorActionTypes, IElement } from '../store/editor/types';
import RpdButton from './RpdButton';
import RpdText from './RpdText';

const components = [
  // 基础组件
  RpdText,
  RpdButton,
];

// https://github.com/microsoft/TypeScript/issues/35859
const RpdRegisterComponentsObject: {[key:string]: React.FunctionComponent} = {};
components.forEach((item) => {
  RpdRegisterComponentsObject[item.name] = item.component;
});

// https://www.pluralsight.com/guides/how-to-render-a-component-dynamically-based-on-a-json-config
const renderer = (data: IElement, setActiveElementUUID: (elementId: string) => EditorActionTypes) => {
  // TODO 减少不必要的渲染
  console.log("render !!!");
  if (typeof RpdRegisterComponentsObject[data.elementName] !== 'undefined') {
    return React.createElement(
      RpdRegisterComponentsObject[data.elementName],
      {
        key: data.elementId,
        // src: data.src,
        // value: data.value
        id: data.elementId,
        commonStyle: data.commonStyle, // 在frontend/node_modules/@types/react/index.d.ts 里面自己添加的属性commonStyle, id, setActiveElementUUID
        setActiveElementUUID,
      },
    );
  }
};

export {
  RpdText,
  RpdButton,
  RpdRegisterComponentsObject,
  renderer,
};
