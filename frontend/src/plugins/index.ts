/* eslint-disable max-len */
import * as React from 'react';
import {
  EditorActionTypes,
  IElement,
  IRdpElement,
} from '../store/editor/types';
import RpdButton from './RpdButton';
import RpdText from './RpdText';

const components = [
  // 基础组件
  RpdText,
  RpdButton,
];

// https://github.com/microsoft/TypeScript/issues/35859
const RpdRegisterComponentsObject: {
  [key: string]: React.FunctionComponent;
} = {};
components.forEach((item) => {
  RpdRegisterComponentsObject[item.name] = item.component;
});

// https://www.pluralsight.com/guides/how-to-render-a-component-dynamically-based-on-a-json-config
const renderer = (
  data: IElement,
  setActiveElementUUID: (elementId: string) => EditorActionTypes,
  changeAttr: (attrName: string, value: number | string) => EditorActionTypes
) => {
  // TODO 减少不必要的渲染
  console.log('render !!!');
  if (typeof RpdRegisterComponentsObject[data.elementName] !== 'undefined') {
    return React.createElement<IRdpElement>(
      RpdRegisterComponentsObject[data.elementName],
      {
        key: data.elementId,
        element: data,
        setActiveElementUUID: setActiveElementUUID,
        changeAttr: changeAttr,
      }
    );
  }
};

export { RpdText, RpdButton, renderer };

export default RpdRegisterComponentsObject;
