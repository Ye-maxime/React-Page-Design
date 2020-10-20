/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import * as React from 'react';
import CSS from 'csstype';
import { Button } from 'antd';
import { EditorActionTypes, ICommonStyle } from '../store/editor/types';

export interface OwnProps {
  id: string;
  commonStyle: ICommonStyle;
  setActiveElementUUID: (elementId: string) => EditorActionTypes;
}

type Props = OwnProps;

const RpdButton: React.FunctionComponent<Props> = ({
  id,
  commonStyle,
  setActiveElementUUID,
}: Props) => {
  const [text, setText] = React.useState('按钮');

  const style: CSS.Properties = {
    // backgroundColor: 'rgba(255, 255, 255, 0.85)',
    // position: 'absolute',
    // right: 0,
    // bottom: '2rem',
    // padding: '0.5rem',
    // fontFamily: 'sans-serif',
    fontSize: `${commonStyle.fontSize}px`,
    width: `${commonStyle.width}px`,
    // color: "yellow",
  };

  return (
    <Button
      className="rpd-button"
      style={style}
      onClick={() => setActiveElementUUID(id)}
    >
      {text}
    </Button>
  );
};

export default {
  name: 'rpd-button',
  component: RpdButton,
};
