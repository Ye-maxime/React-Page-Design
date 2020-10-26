import * as React from 'react';
import CSS from 'csstype';
import { Input } from 'antd';
import { EditorActionTypes, IElement } from '../store/editor/types';

export interface OwnProps {
  element: IElement;
  setActiveElementUUID: (elementId: string) => EditorActionTypes;
  changeAttr: (attrName: string, value: number | string) => EditorActionTypes;
}

type Props = OwnProps;

const RpdButton: React.FunctionComponent<Props> = ({
  element,
  setActiveElementUUID,
  changeAttr,
}: Props) => {
  const [text, setText] = React.useState('按钮');

  const style: CSS.Properties = {
    fontSize: `${element.commonStyle.fontSize}px`,
    width: `${element.commonStyle.width}px`,
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    changeAttr('value', event.target.value);
  };

  return (
    <Input
      className="rpd-button"
      style={style}
      onClick={() => setActiveElementUUID(element.elementId)}
      onChange={onChange}
      value={text}
    />
  );
};

export default {
  name: 'rpd-button',
  component: RpdButton,
};
