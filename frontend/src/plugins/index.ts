import * as React from 'react';
import { IElement } from '../store/editor/types';
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
const renderer = (data: IElement, index: number) => {
  if (typeof RpdRegisterComponentsObject[data.elementName] !== 'undefined') {
    return React.createElement(
      RpdRegisterComponentsObject[data.elementName],
      {
        key: index,
        // src: data.src,
        // value: data.value
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
