import * as React from 'react';
import isEqual from 'lodash/isEqual';
import { IElement } from '../store/editor/types';

export interface OwnProps {
  element: IElement;
}

type Props = OwnProps;

const RpdText: React.FunctionComponent<Props> = React.memo(
  ({ element }: Props) => {
    console.log('render RpdText!!!');
    return (
      <div className="rpd-text" placeholder={element.propsValue.placeholder}>
        {element.value}
      </div>
    );
  },
  (prevProps, nextProps) =>
    // 浅比较当前element 里面其commonStyle 和 propsValue中的所有属性是否相等
    isEqual(prevProps.element.commonStyle, nextProps.element.commonStyle)
    && isEqual(prevProps.element.propsValue, nextProps.element.propsValue),
);

export default {
  name: 'rpd-text',
  component: RpdText,
};
