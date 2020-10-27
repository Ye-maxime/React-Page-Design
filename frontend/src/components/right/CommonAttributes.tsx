// 对应client/pages/editor/components/attr-configure/attr-props-components/base-attr.vue
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { throttle } from 'lodash';
import { InputNumber } from 'antd';
import * as actions from '../../store/editor/actions';
import { EditorActionTypes, IElement } from '../../store/editor/types';
import { RootState } from '../../store/index';

interface IStateProps {
  activeElement: IElement;
}

interface IDispatchProps {
  changeAttr: (attrName: string, value: number | string) => EditorActionTypes;
  addHistoryCache: () => EditorActionTypes;
}

type Props = IStateProps & IDispatchProps;

const CommonAttributes: React.FunctionComponent<Props> = ({
  activeElement,
  changeAttr,
  addHistoryCache,
}: Props) => {
  const [fontSizeValue, setFontSizeValue] = React.useState(
    activeElement.commonStyle.fontSize
  );
  const [widthValue, setWidthValue] = React.useState(
    activeElement.commonStyle.width
  );

  React.useEffect(() => {
    // 当前聚焦中间面板上的组件发生改变时候 重新渲染组件对应的所有属性
    setFontSizeValue(activeElement.commonStyle.fontSize);
    setWidthValue(activeElement.commonStyle.width);
  }, [activeElement]);

  const map: Map<string, any> = new Map();
  map.set('fontSize', setFontSizeValue);
  map.set('width', setWidthValue);

  const changeHandler = (attrName: string) => {
    return (value: number) => {
      // 先调用setState改变界面
      map.get(attrName)(value);
      // reducer 出去
      changeAttr(attrName, value);
      throttle(addHistoryCache, 3000)();
    };
  };

  return (
    <>
      <h6>共有属性</h6>
      <div className="attr-item-edit-wrapper">
        <p className="attr-item-title">字体大小 :</p>
        <div>
          <InputNumber
            min={6}
            max={32}
            onChange={changeHandler('fontSize')}
            value={fontSizeValue}
          />
        </div>
      </div>
      <div className="attr-item-edit-wrapper">
        <p className="attr-item-title">宽度 :</p>
        <div>
          <InputNumber
            min={0}
            max={300}
            onChange={changeHandler('width')}
            value={widthValue}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState, ownProps: any): IStateProps => ({
  activeElement: state.editor.activeElement,
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
