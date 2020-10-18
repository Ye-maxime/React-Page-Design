// 对应client/pages/editor/components/attr-configure/attr-props-components/base-attr.vue
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { InputNumber } from 'antd';
import * as actions from '../../store/editor/actions';
import { EditorActionTypes, IElement } from '../../store/editor/types';
import { RootState } from '../../store/index';

interface IStateProps {
  activeElement: IElement;
}

interface IDispatchProps {
  changeFontSize: (fontSize: number) => EditorActionTypes;
}

type Props = IStateProps & IDispatchProps;

const CommonAttributes: React.FunctionComponent<Props> = ({
  activeElement,
  changeFontSize,
}: Props) => {
  const [fontSizeValue, setFontSizeValue] = React.useState(activeElement.commonStyle.fontSize);

  React.useEffect(() => {
    setFontSizeValue(activeElement.commonStyle.fontSize);
  }, [activeElement]);

  const onChange = (value: number): void => {
    setFontSizeValue(value);
    changeFontSize(value);
  };

  return (
    <>
      <div className="attr-item-edit-wrapper">
        <p className="attr-item-title">字体大小：</p>
        <div className="col-2 attr-item-edit-input">
          <InputNumber
            min={6}
            max={32}
            onChange={onChange}
            value={fontSizeValue}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState, ownProps: any): IStateProps => (
  {
    activeElement: state.editor.activeElement,
  }
);

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  changeFontSize: (fontSize) => dispatch(actions.changeFontSize(fontSize)),
});

export default connect<IStateProps, IDispatchProps, any>(
  mapStateToProps,
  mapDispatchToProps,
)(CommonAttributes);
