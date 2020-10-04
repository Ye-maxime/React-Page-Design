/* eslint-disable max-len */
// 基础组件中的单个组件
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../store/editor/actions';
import {
  IElement, EditorActionTypes,
} from '../store/editor/types';

// export interface IComponent {
//   elName: string;
//   title: string;
//   icon: string;
//   valueType: string;
//   defaultStyle: {
//     height: number;
//     width?: number;
//     paddingTop?: number;
//     paddingBottom?: number;
//     borderColor?: string;
//     borderStyle?: string;
//     borderWidth?: number;
//     borderRadius?: number;
//   };
// }

export interface OwnProps {
  title: string;
  icon: string;
}

interface IDispatchProps {
  addElement: (newElement: IElement) => EditorActionTypes;
}

type Props = OwnProps & IDispatchProps;

const BasicComponent: React.FunctionComponent<Props> = ({ title, icon, addElement }: Props) => {
  const handleClick = () => {
    const newElement: IElement = {
      elementId: '2',
      elementName: title,
      value: '你好',
      valueType: '',
      events: [],
    };

    addElement(newElement);
  };

  return (
    <li>
      <div className="components-lib-item" onClick={handleClick}>
        <div className="lib-item-img">
          <i className={icon} />
        </div>
        <p className="lib-item-title">{title}</p>
      </div>
    </li>
  );
};

// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  addElement: (newElement) => dispatch(actions.addElement(newElement)),
});

export default connect<any, IDispatchProps, OwnProps>(null, mapDispatchToProps)(BasicComponent);
