// 对应client/pages/editor/components/attr-configure/attr-props-components/base-attr.vue
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { InputNumber } from 'antd';
import * as actions from '../../store/editor/actions';
import { EditorActionTypes } from '../../store/editor/types';

interface IDispatchProps {
  changeFontSize: (fontSize: number) => EditorActionTypes;
}

type Props = IDispatchProps;

const CommonAttributes: React.FunctionComponent<Props> = ({
  changeFontSize,
}: Props) => {
  const onChange = (value: string): void => {
    changeFontSize(parseInt(value, 10));
  };

  // vuex有getter,目的是快捷得到state；redux没有这层，react-redux mapStateToProps参数做了这个工作。
  // Todo computed属性得缓存 const activeElement = getActiveElement(props.activeElementUUID)
  // Todo 然后再绑定InputNumber value={activeElement.commonStyle.fontSize}

  return (
    <>
      <div className="attr-item-edit-wrapper">
        <p className="attr-item-title">字体大小：</p>
        <div className="col-2 attr-item-edit-input">
          <InputNumber min={6} max={32} defaultValue={16} onChange={onChange} />
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  changeFontSize: (fontSize) => dispatch(actions.changeFontSize(fontSize)),
});

export default connect<any, IDispatchProps, any>(
  null,
  mapDispatchToProps,
)(CommonAttributes);
