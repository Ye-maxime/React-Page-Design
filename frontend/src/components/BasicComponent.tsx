/* eslint-disable max-len */
// 左侧导航栏里的基础组件中的单个组件
import * as React from 'react';
import { Button } from 'antd';
import { IBasicComponentConfig } from '../config/basicComponentConfig';

// export interface IComponent {
//   elementName: string;
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
  element: IBasicComponentConfig;
  handleClick: (element: IBasicComponentConfig) => void;
}

type Props = OwnProps;

const BasicComponent: React.FunctionComponent<Props> = ({
  element,
  handleClick,
}: Props) => (
  <li>
    <Button className="components-lib-item" onClick={() => handleClick(element)}>
      <i className={`lib-item-img ${element.icon}`} />
      <p className="lib-item-title">{element.title}</p>
    </Button>
  </li>
);

// // 将 对应action 插入到组件的 props 中
// const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
//   addElement: (newElement) => dispatch(actions.addElement(newElement)),
// });

// export default connect<any, IDispatchProps, OwnProps>(null, mapDispatchToProps)(BasicComponent);
export default BasicComponent;
