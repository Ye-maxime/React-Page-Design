/* eslint-disable max-len */
// 左侧导航栏组件库
// https://github.com/huangwei9527/quark-h5/blob/master/client/pages/editor/components/component-libs/Index.vue
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import throttle from 'lodash/throttle';
import * as actions from '@store/editor/actions';
import { EditorActionTypes, IElement } from '@store/editor/types';
import componentsList, {
  IBasicComponentConfig,
} from '@config/basicComponentConfig';
import { getElementConfig } from '@dataModels/index';
import BasicComponent from './BasicComponent';

interface IDispatchProps {
  addElement: (newElement: IElement) => EditorActionTypes;
  setActiveElementUUID: (elementId: string) => EditorActionTypes;
  addHistoryCache: () => EditorActionTypes;
}

type Props = IDispatchProps;

const ComponentLibs: React.FunctionComponent<Props> = ({
  addElement,
  setActiveElementUUID,
  addHistoryCache,
}: Props) => {
  // 点击基本组件按钮 编辑页面插入新节点
  const handleClick = (element: IBasicComponentConfig): void => {
    const elementData: IElement = getElementConfig(element, { zIndex: 2 });
    addElement(elementData);
    setActiveElementUUID(elementData.elementId);
    throttle(addHistoryCache, 3000)();
  };

  return (
    <div className="editor-side-bar">
      <div className="components-libs-wrapper">
        <p className="page-title">组件库</p>
        <ul>
          {componentsList.map((component) => (
            <BasicComponent
              key={component.elementName}
              element={component}
              handleClick={handleClick}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  addElement: (newElement) => dispatch(actions.addElement(newElement)),
  setActiveElementUUID: (elementId) => dispatch(actions.setActiveElementUUID(elementId)),
  addHistoryCache: () => dispatch(actions.addHistoryCache()),
});

export default connect<any, IDispatchProps, any>(
  null,
  mapDispatchToProps,
)(ComponentLibs);
