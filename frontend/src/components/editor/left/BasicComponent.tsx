/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
// 左侧导航栏里的基础组件中的单个组件
import * as React from 'react';
import { Button } from 'antd';
import { IBasicComponentConfig } from '@config/basicComponentConfig';

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
    <Button
      className="components-lib-item"
      onClick={() => handleClick(element)}
    >
      <i className={element.icon} />
      <p>{element.title}</p>
    </Button>
  </li>
);

export default BasicComponent;
