import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { throttle, isEqual } from 'lodash';
import { InputNumber } from 'antd';
import * as actions from '@store/editor/actions';
import { EditorActionTypes, IElement } from '@store/editor/types';
import { RootState } from '@store/index';
import { getActiveElement } from '@selectors/index';

interface IStateProps {
  activeElement: IElement;
}

interface IDispatchProps {
  changeAttr: (attrName: string, value: number | string) => EditorActionTypes;
  addHistoryCache: () => EditorActionTypes;
}

type Props = IStateProps & IDispatchProps;

const CommonAttributes: React.FunctionComponent<Props> = React.memo(
  ({ activeElement, changeAttr, addHistoryCache }: Props) => {
    const changeHandler = (attrName: string) => {
      return (value: number) => {
        changeAttr(attrName, value);
        throttle(addHistoryCache, 3000)();
      };
    };
    console.log('render CommonAttributes!!');
    return (
      <>
        {activeElement && (
          <>
            <h6>共有属性</h6>
            <div className="attr-item-edit-wrapper">
              <p className="attr-item-title">字体大小 :</p>
              <div>
                <InputNumber
                  min={6}
                  max={32}
                  onChange={changeHandler('fontSize')}
                  value={activeElement.commonStyle.fontSize}
                />
              </div>
            </div>
            <div className="attr-item-edit-wrapper">
              <p className="attr-item-title">宽度 :</p>
              <div>
                <InputNumber
                  min={0}
                  max={800}
                  onChange={changeHandler('width')}
                  value={activeElement.commonStyle.width}
                />
              </div>
            </div>
          </>
        )}
      </>
    );
  },
  (prevProps, nextProps) =>
    // 浅比较commonStyle中的所有属性是否相等
    isEqual(
      prevProps.activeElement.commonStyle,
      nextProps.activeElement.commonStyle
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
)(CommonAttributes);
