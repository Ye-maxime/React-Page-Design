import * as React from 'react';
import { Input } from 'antd';
import CSS from 'csstype';
import { EditorActionTypes, IElement } from '../store/editor/types';

export interface OwnProps {
  element: IElement;
  setActiveElementUUID: (elementId: string) => EditorActionTypes;
}

type Props = OwnProps;

const RpdText: React.FunctionComponent<Props> = ({
  element,
  setActiveElementUUID,
}: Props) => {
  const [text, setText] = React.useState('');

  // https://fettblog.eu/typescript-react/styles/
  const style: CSS.Properties = {
    fontSize: `${element.commonStyle.fontSize}px`,
    width: `${element.commonStyle.width}px`,
  };

  return (
    <Input
      className="rpd-text"
      placeholder={element.propsValue.placeholder}
      style={style}
      onClick={() => setActiveElementUUID(element.elementId)}
    />
  );
};

export default {
  name: 'rpd-text',
  component: RpdText,
};
