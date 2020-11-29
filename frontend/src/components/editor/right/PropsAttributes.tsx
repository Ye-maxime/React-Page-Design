// 把某个组件单有的属性显示在右侧编辑栏
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import isEqual from 'lodash/isEqual';
import throttle from 'lodash/throttle';
import * as actions from '@store/editor/actions';
import { EditorActionTypes, IElement, IRdpElement } from '@store/editor/types';
import { RootState } from '@store/index';
import { getActiveElement } from '@selectors/index';
import attrRdpComponentsMap from './attrRdpComponents/index';

interface IStateProps {
  activeElement: IElement;
}

interface IDispatchProps {
  changeAttr: (attrName: string, value: number | string) => EditorActionTypes;
  addHistoryCache: () => EditorActionTypes;
}

type Props = IStateProps & IDispatchProps;

const PropsAttributes: React.FunctionComponent<Props> = React.memo(
  ({ activeElement, changeAttr, addHistoryCache }: Props) => {
    const currentElementProps = () => {
      const componentNames = [];
      if (activeElement) {
        const keyList = Object.keys(activeElement.propsValue);
        if (keyList.length === 0) {
          return [];
        }
        let editPropsComponentNameList = [...attrRdpComponentsMap.keys()];
        // 过滤掉找不到对应attr props编辑组件的key
        for (let key of keyList) {
          if (editPropsComponentNameList.includes('attr-rpd-' + key)) {
            componentNames.push('attr-rpd-' + key);
          }
        }
      }
      return componentNames;
    };

    const componentNames = currentElementProps();
    console.log('render PropsAttributes!!');
    return (
      <>
        {componentNames.length > 0 && <h6>特有属性</h6>}
        {componentNames.map((k) => (
          <div className="attr-item-edit-wrapper" key={k}>
            {React.createElement<IRdpElement>(attrRdpComponentsMap.get(k), {
              element: activeElement,
              changeAttr: changeAttr,
              addHistoryCache: throttle(addHistoryCache, 3000),
            })}
          </div>
        ))}
      </>
    );
  },
  (prevProps, nextProps) =>
    // 浅比较propsValue中的所有属性是否相等
    isEqual(
      prevProps.activeElement.propsValue,
      nextProps.activeElement.propsValue
    )
);

const mapStateToProps = (state: RootState, ownProps: any): IStateProps => ({
  activeElement: getActiveElement(state.editor),
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  changeAttr: (attrName, value) =>
    dispatch(actions.changeAttr(attrName, value)),
  addHistoryCache: () => dispatch(actions.addHistoryCache()),
});

export default connect<IStateProps, IDispatchProps, any>(
  mapStateToProps,
  mapDispatchToProps
)(PropsAttributes);
