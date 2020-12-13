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

const AttrRpdPlaceholder: React.FunctionComponent<Props> = React.memo(
  ({ element, changeAttr, addHistoryCache }: Props) => {
    console.log('render AttrRpdPlaceholder!!!');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      changeAttr('placeholder', event.target.value);
      addHistoryCache();
    };

    return (
      <>
        <p className="attr-item-title">占位符 :</p>
        <Input
          className="attr-item-input"
          placeholder="请输入文本内容"
          onChange={onChange}
          value={element.propsValue.placeholder}
        />
      </>
    );
  },
  (prevProps, nextProps) => prevProps.element.propsValue.placeholder
    === nextProps.element.propsValue.placeholder,
);

export default {
  name: 'attr-rpd-placeholder',
  component: AttrRpdPlaceholder,
};
