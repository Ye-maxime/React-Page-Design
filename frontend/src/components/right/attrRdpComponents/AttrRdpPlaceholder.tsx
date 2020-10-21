// 对应client/pages/editor/components/attr-configure/attr-props-components/props-attr/text.vue
// 右侧 需要带文本编辑的属性
import * as React from 'react';
import { Input } from 'antd';
import { EditorActionTypes, IElement } from '../../../store/editor/types';

export interface OwnProps {
  element: IElement;
  changeAttr: (attrName: string, value: number | string) => EditorActionTypes;
}

type Props = OwnProps;

const AttrRpdPlaceholder: React.FunctionComponent<Props> = ({
  element,
  changeAttr,
}: Props) => {
  const [tempPlaceholder, setTempPlaceholder] = React.useState(element.propsValue.placeholder);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempPlaceholder(event.target.value);
    changeAttr('placeholder', event.target.value);
  };

  return (
    <Input
      className="rpd-text"
      placeholder="请输入文本内容"
      onChange={onChange}
      value={tempPlaceholder}
    />
  );
};

export default {
  name: 'attr-rpd-placeholder',
  component: AttrRpdPlaceholder,
};
