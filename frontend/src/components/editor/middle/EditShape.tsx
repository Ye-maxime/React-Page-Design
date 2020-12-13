/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '@store/editor/actions';
import { RootState } from '@store/index';
import { getCommonStyle } from '@dataModels/index';
import { ICommonStyle, EditorActionTypes } from '@store/editor/types';

export interface OwnProps {
  children: React.ReactNode;
  commonStyle: ICommonStyle;
  elementId: string;
}
interface IStateProps {
  activeElementUUID: string;
}

interface IDispatchProps {
  addHistoryCache: () => EditorActionTypes;
  resizeElement: (commonStyle: ICommonStyle) => EditorActionTypes;
  setActiveElementUUID: (elementId: string) => EditorActionTypes;
}

type Props = OwnProps & IStateProps & IDispatchProps;

const EditShape: React.FunctionComponent<Props> = ({
  children,
  commonStyle,
  elementId,
  activeElementUUID,
  addHistoryCache,
  resizeElement,
  setActiveElementUUID,
}: Props) => {
  // l = left, t = top, r = right, b = bottom
  const POINT_LIST = ['lt', 'rt', 'lb', 'rb', 'l', 'r', 't', 'b'];
  // 上下左右 对应 东南西北
  const DIRECTION_KEY = {
    t: 'n',
    b: 's',
    l: 'w',
    r: 'e',
  };
  const EDITOR_PADDING = 20;

  /**
   * 获取point计算后样式
   */
  const getPointStyle = (point: string) => {
    const { height, width } = commonStyle;
    const hasT = /t/.test(point);
    const hasB = /b/.test(point);
    const hasL = /l/.test(point);
    const hasR = /r/.test(point);
    let newLeft = 0;
    let newTop = 0;
    if (point.length === 2) {
      newLeft = hasL ? 0 : width;
      newTop = hasT ? 0 : height;
    } else {
      // 上下点，宽度固定在中间
      if (hasT || hasB) {
        newLeft = width / 2 - 5;
        newTop = hasT ? 0 : height;
      }
      // 左右点，高度固定在中间
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width;
        newTop = height / 2 - 5;
      }
    }
    const style = {
      marginLeft: hasL || hasR ? '-5px' : 0,
      marginTop: hasT || hasB ? '-5px' : 0,
      left: `${newLeft}px`,
      top: `${newTop}px`,
      cursor: `${point
        .split('')
        .reverse()
        .map((m) => DIRECTION_KEY[m])
        .join('')}-resize`,
    };
    return style;
  };

  const handleTopWrapperClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  /**
   * 限制组件放大后的大小，不让其超过编辑器的宽和高
   */
  const limitComponentSize = (width: number, height: number) => {
    const {
      clientWidth: editorWidth,
      clientHeight: editorHeight,
    } = document.getElementById('editor-pane');

    width = Math.min(editorWidth - 2 * EDITOR_PADDING, width);
    height = Math.min(editorHeight - 2 * EDITOR_PADDING, height);
    return {
      width,
      height,
    };
  };

  /**
   * 避免移出范围
   */
  const limitTopLeft = (
    top: number,
    left: number,
    componentWidth = commonStyle.width,
    componentHeight = commonStyle.height,
  ) => {
    // 获取编辑器的宽和高
    const {
      clientWidth: editorWidth,
      clientHeight: editorHeight,
    } = document.getElementById('editor-pane');

    return {
      top: Math.max(
        Math.min(editorHeight - (EDITOR_PADDING + componentHeight), top),
        EDITOR_PADDING,
      ),
      left: Math.max(
        Math.min(editorWidth - (EDITOR_PADDING + componentWidth), left),
        EDITOR_PADDING,
      ),
    };
  };

  /**
   * 移动改变元素定位
   */
  const handleMouseDownOnElement = (event: React.MouseEvent) => {
    setActiveElementUUID(elementId);
    const pos = { ...commonStyle };
    const startY = event.clientY;
    const startX = event.clientX;
    const startTop = pos.top;
    const startLeft = pos.left;
    const firstTime = new Date().getTime();
    let lastTime;

    const moveCallback = (moveEvent: MouseEvent) => {
      // 移动的时候，不需要向父元素传递事件，只需要单纯的移动就OK
      moveEvent.stopPropagation();
      moveEvent.preventDefault();

      const currX = moveEvent.clientX;
      const currY = moveEvent.clientY;
      const left = currX - startX + startLeft;
      const top = currY - startY + startTop;
      const limitEdge = limitTopLeft(top, left);

      resizeElement({
        ...commonStyle,
        left: limitEdge.left,
        top: limitEdge.top,
      });
    };

    const upCallback = () => {
      lastTime = new Date().getTime();
      if (lastTime - firstTime > 200) {
        // 鼠标移动完成时才记入历史纪录
        addHistoryCache();
      }
      document.removeEventListener('mousemove', moveCallback, true);
      document.removeEventListener('mouseup', upCallback, true);
    };

    document.addEventListener('mousemove', moveCallback, true);
    document.addEventListener('mouseup', upCallback, true);
    return true;
  };

  /**
   * 拉动小圆点改变元素大小
   */
  const handleMouseDownOnPoint = (event: React.MouseEvent, point: string) => {
    console.log('handleMouseDownOnPoint');
    // 不需要传递给父组件 以此来避免触发handleMouseDownOnElement
    event.stopPropagation();
    event.preventDefault();
    const pos = { ...commonStyle };
    const { height } = pos;
    const { width } = pos;
    const { top } = pos;
    const { left } = pos;
    const startX = event.clientX;
    const startY = event.clientY;

    const moveCallback = (moveEvent: MouseEvent) => {
      const currX = moveEvent.clientX;
      const currY = moveEvent.clientY;
      const disY = currY - startY;
      const disX = currX - startX;
      const hasT = /t/.test(point);
      const hasB = /b/.test(point);
      const hasL = /l/.test(point);
      const hasR = /r/.test(point);
      const newHeight = +height + (hasT ? -disY : hasB ? disY : 0);
      const newWidth = +width + (hasL ? -disX : hasR ? disX : 0);
      const componentSize = limitComponentSize(
        newWidth > 0 ? newWidth : 0,
        newHeight > 0 ? newHeight : 0,
      );
      const limitEdge = limitTopLeft(
        +top + (hasT ? disY : 0),
        +left + (hasL ? disX : 0),
        newWidth,
        newHeight,
      );
      // 统一更改commonStyle
      resizeElement({
        ...commonStyle,
        height: componentSize.height,
        width: componentSize.width,
        left: limitEdge.left,
        top: limitEdge.top,
      });
    };

    const upCallback = () => {
      // 鼠标移动完成时才记入历史纪录
      addHistoryCache();
      document.removeEventListener('mousemove', moveCallback);
      document.removeEventListener('mouseup', upCallback);
    };
    document.addEventListener('mousemove', moveCallback);
    document.addEventListener('mouseup', upCallback);
  };

  return (
    <div
      className="editor-shape"
      // https://fettblog.eu/typescript-react/styles/
      style={getCommonStyle(commonStyle)}
      onClick={handleTopWrapperClick}
      onMouseDown={handleMouseDownOnElement}
    >
      {elementId === activeElementUUID
        && POINT_LIST.map((point) => (
          <div
            className="editor-shape-point"
            key={point}
            style={getPointStyle(point)}
            onMouseDown={(event) => handleMouseDownOnPoint(event, point)}
          />
        ))}
      {children}
    </div>
  );
};
const mapStateToProps = (state: RootState): IStateProps => ({
  activeElementUUID: state.editor.activeElementUUID,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  addHistoryCache: () => dispatch(actions.addHistoryCache()),
  resizeElement: (commonStyle) => dispatch(actions.resizeElement(commonStyle)),
  setActiveElementUUID: (elementId) => dispatch(actions.setActiveElementUUID(elementId)),
});

export default connect<IStateProps, IDispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(EditShape);
