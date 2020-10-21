// 对应client/pages/editor/components/attr-configure/attr-edit.vue
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/index';
import CommonAttributes from './CommonAttributes';
import PropsAttributes from './PropsAttributes';

interface IStateProps {
  activeElementUUID: string;
}

type Props = IStateProps;

const EditAttributesTab: React.FunctionComponent<Props> = ({
  activeElementUUID,
}: Props) =>
  activeElementUUID ? (
    <div className="attr-edit-inner">
      <div className="props-attr-style">
        <PropsAttributes />
      </div>
      <div className="common-attr-style">
        <CommonAttributes />
      </div>
    </div>
  ) : (
    <div>
      <p className="gray paddingT30 text-center">
        请在画板上选择需要编辑得元素
      </p>
    </div>
  );

// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = (state: RootState): IStateProps => ({
  activeElementUUID: state.editor.activeElementUUID,
});
// 需要按顺序写 IStateProps, IDispatchProps, OwnProps
export default connect<IStateProps, any, any>(
  mapStateToProps,
  null
)(EditAttributesTab);
