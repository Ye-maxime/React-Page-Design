// 基础组件中的单个组件
import * as React from 'react';

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

type Props = OwnProps;

const RdpComponent: React.FunctionComponent<Props> = ({ title, icon }: Props) => (
  <li>
    <div className="components-lib-item">
      <div className="lib-item-img">
        <i className={icon} />
      </div>
      <p className="lib-item-title">{title}</p>
    </div>
  </li>
);

export default RdpComponent;
