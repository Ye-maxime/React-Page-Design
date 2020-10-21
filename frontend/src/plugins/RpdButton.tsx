import * as React from 'react';
import CSS from 'csstype';
import { Button } from 'antd';
import { EditorActionTypes, IElement } from '../store/editor/types';

export interface OwnProps {
  element: IElement;
  setActiveElementUUID: (elementId: string) => EditorActionTypes;
}

type Props = OwnProps;

const RpdButton: React.FunctionComponent<Props> = ({
  element,
  setActiveElementUUID,
}: Props) => {
  const [text, setText] = React.useState('按钮');

  const style: CSS.Properties = {
    fontSize: `${element.commonStyle.fontSize}px`,
    width: `${element.commonStyle.width}px`,
  };

  return (
    <Button
      className="rpd-button"
      style={style}
      onClick={() => setActiveElementUUID(element.elementId)}
    >
      {text}
    </Button>
  );
};

export default {
  name: 'rpd-button',
  component: RpdButton,
};
