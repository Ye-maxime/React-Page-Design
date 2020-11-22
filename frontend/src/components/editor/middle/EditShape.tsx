import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '@store/editor/actions';
import { RootState } from '@store/index';
import { getCommonStyle } from '@dataModels/index';
import { ICommonStyle } from '@store/editor/types';
import { EditorActionTypes } from '@store/editor/types';

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
  const pointList = ['lt', 'rt', 'lb', 'rb', 'l', 'r', 't', 'b'];
  // 上下左右 对应 东南西北
  const directionKey = {
    t: 'n',
    b: 's',
    l: 'w',
    r: 'e',
  };

  /**
   * 获取point计算后样式
   */
  const getPointStyle = (point: string) => {
    const pos = { ...commonStyle };
    const height = pos.height;
    const width = pos.width;
    let hasT = /t/.test(point);
    let hasB = /b/.test(point);
    let hasL = /l/.test(point);
    let hasR = /r/.test(point);
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
      cursor:
        point
          .split('')
          .reverse()
          .map((m) => directionKey[m])
          .join('') + '-resize',
    };
    return style;
  };

  const handleTopWrapperClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  /**
   * 移动改变元素定位
   */
  const handleMouseDownOnElement = (event: React.MouseEvent) => {
    setActiveElementUUID(elementId);
    const pos = { ...commonStyle };
    let startY = event.clientY;
    let startX = event.clientX;
    let startTop = pos.top;
    let startLeft = pos.left;
    let firstTime = new Date().getTime();
    let lastTime;

    console.log(
      `handleMouseDownOnElement startY = ${startY}, startX = ${startX}, startTop = ${startTop}, startLeft = ${startLeft}`
    );

    let moveCallback = (moveEvent: MouseEvent) => {
      // 移动的时候，不需要向父元素传递事件，只需要单纯的移动就OK
      moveEvent.stopPropagation();
      moveEvent.preventDefault();

      let currX = moveEvent.clientX;
      let currY = moveEvent.clientY;
      resizeElement({
        ...commonStyle,
        left: currX - startX + startLeft,
        top: currY - startY + startTop,
      });
    };

    let upCallback = () => {
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
    console.log(`handleMouseDownOnPoint`);
    // 不需要传递给父组件 以此来避免触发handleMouseDownOnElement
    event.stopPropagation();
    event.preventDefault();
    const pos = { ...commonStyle };
    let height = pos.height;
    let width = pos.width;
    let top = pos.top;
    let left = pos.left;
    let startX = event.clientX;
    let startY = event.clientY;

    let moveCallback = (moveEvent: MouseEvent) => {
      let currX = moveEvent.clientX;
      let currY = moveEvent.clientY;
      let disY = currY - startY;
      let disX = currX - startX;
      let hasT = /t/.test(point);
      let hasB = /b/.test(point);
      let hasL = /l/.test(point);
      let hasR = /r/.test(point);
      let newHeight = +height + (hasT ? -disY : hasB ? disY : 0);
      let newWidth = +width + (hasL ? -disX : hasR ? disX : 0);
      // 统一更改commonStyle
      resizeElement({
        ...commonStyle,
        height: newHeight > 0 ? newHeight : 0,
        width: newWidth > 0 ? newWidth : 0,
        left: +left + (hasL ? disX : 0),
        top: +top + (hasT ? disY : 0),
      });
    };

    let upCallback = () => {
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
      {elementId === activeElementUUID &&
        pointList.map((point) => (
          <div
            className="editor-shape-point"
            key={point}
            style={getPointStyle(point)}
            onMouseDown={(event) => handleMouseDownOnPoint(event, point)}
          ></div>
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
  setActiveElementUUID: (elementId) =>
    dispatch(actions.setActiveElementUUID(elementId)),
});

export default connect<IStateProps, IDispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(EditShape);
