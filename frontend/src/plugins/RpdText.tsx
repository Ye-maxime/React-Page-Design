/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { Input } from 'antd';
import CSS from 'csstype';
import { EditorActionTypes, ICommonStyle } from '../store/editor/types';

export interface OwnProps {
  id: string;
  commonStyle: ICommonStyle;
  setActiveElementUUID: (elementId: string) => EditorActionTypes;
}

type Props = OwnProps;

const RpdText: React.FunctionComponent<Props> = ({ id, commonStyle, setActiveElementUUID }: Props) => {
  const [text, setText] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.focus();
  }, [commonStyle]);

  // https://fettblog.eu/typescript-react/styles/
  const style: CSS.Properties = {
    // backgroundColor: 'rgba(255, 255, 255, 0.85)',
    // position: 'absolute',
    // right: 0,
    // bottom: '2rem',
    // padding: '0.5rem',
    // fontFamily: 'sans-serif',
    fontSize: `${commonStyle.fontSize}px`,
    // color: "yellow",
  };

  return (
    <Input
      className="rpd-text"
      placeholder="请输入文字"
      ref={inputRef}
      style={style}
      onClick={() => setActiveElementUUID(id)}
    />
  );
};

export default {
  name: 'rpd-text',
  component: RpdText,
};
