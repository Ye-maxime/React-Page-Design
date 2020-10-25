// 对应client/pages/editor/components/attr-configure/attr-props-components/props-attr/index.vue
// 把某个组件单有的属性显示在右侧编辑栏
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../../store/editor/actions';
import {
  EditorActionTypes,
  IElement,
  IRdpElement,
} from '../../store/editor/types';
import { RootState } from '../../store/index';
import attrRdpComponentsMap, {
  attrRdpChineseMap,
} from './attrRdpComponents/index';

interface IStateProps {
  activeElement: IElement;
}

interface IDispatchProps {
  changeAttr: (attrName: string, value: number | string) => EditorActionTypes;
}

type Props = IStateProps & IDispatchProps;

const PropsAttributes: React.FunctionComponent<Props> = ({
  activeElement,
  changeAttr,
}: Props) => {
  const currentElementProps = () => {
    const keyList = Object.keys(activeElement.propsValue);
    if (keyList.length === 0) {
      return [];
    }
    let editPropsComponentNameList = [...attrRdpComponentsMap.keys()];
    // 过滤掉找不到对应attr props编辑组件的key
    const componentNames = [];
    for (let key of keyList) {
      if (editPropsComponentNameList.includes('attr-rpd-' + key)) {
        componentNames.push('attr-rpd-' + key);
      }
    }
    return componentNames;
  };

  const componentNames = currentElementProps();

  return (
    <>
      {componentNames.length > 0 && <h3>特有属性</h3>}
      {componentNames.map((k) => (
        <div className="attr-item-edit-wrapper" key={activeElement.elementId}>
          <p className="attr-item-title">{attrRdpChineseMap.get(k)} :</p>
          <div className="attr-item-edit-input">
            {React.createElement<IRdpElement>(attrRdpComponentsMap.get(k), {
              element: activeElement,
              changeAttr: changeAttr,
            })}
          </div>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state: RootState, ownProps: any): IStateProps => ({
  activeElement: state.editor.activeElement,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  changeAttr: (attrName, value) =>
    dispatch(actions.changeAttr(attrName, value)),
});

export default connect<IStateProps, IDispatchProps, any>(
  mapStateToProps,
  mapDispatchToProps
)(PropsAttributes);
