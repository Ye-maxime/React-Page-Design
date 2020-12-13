/* eslint-disable import/no-unresolved */
// 右侧 需要带文本编辑的属性
import * as React from 'react';
import { Input } from 'antd';
import { EditorActionTypes, IElement } from '@store/editor/types';

export interface OwnProps {
  element: IElement;
  changeAttr: (attrName: string, value: number | string) => EditorActionTypes;
  addHistoryCache: () => EditorActionTypes;
}

type Props = OwnProps;

const AttrRpdText: React.FunctionComponent<Props> = React.memo(
  ({ element, changeAttr, addHistoryCache }: Props) => {
    console.log('render AttrRpdText!!');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      changeAttr('text', event.target.value);
      changeAttr('value', event.target.value);
      addHistoryCache();
    };

    return (
      <>
        <p className="attr-item-title">文本内容 :</p>
        <Input
          className="attr-item-input"
          placeholder="请输入文本内容"
          onChange={onChange}
          value={element.propsValue.text}
        />
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.element.propsValue.text === nextProps.element.propsValue.text
);

export default {
  name: 'attr-rpd-text',
  component: AttrRpdText,
};
