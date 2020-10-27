/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import produce from 'immer'; // https://www.pluralsight.com/guides/deeply-nested-objectives-redux
import { cloneDeep } from 'lodash';

import {
  ProjectState,
  ADD_PAGE,
  DELETE_PAGE,
  ADD_ELEMENT,
  DELETE_ELEMENT,
  SET_ACTIVE_PAGE_UUID,
  SET_ACTIVE_ELEMENT_UUID,
  CHANGE_ATTR,
  EditorActionTypes,
  ADD_HISTORY_CACHE,
  UN_DO,
  RE_DO,
} from './types';

// 对应 client/store/modules/editor.js 中的state
const initialState: ProjectState = {
  projectData: {
    projectId: '1',
    name: 'project1',
    title: '未命名场景',
    description: '',
    script: '',
    width: 500,
    height: 500,
    pages: [
      //   {
      //     pageId: '1',
      //     name: 'page1',
      //     elements: [
      //       {
      //         elementId: '1',
      //         elementName: '按钮',
      //         value: '点我', // 绑定值
      //         valueType: 'string', // 值类型
      //         events: [],
      //       },
      //     ],
      //   },
    ],
  },
  // 当前正在编辑的页面uuid
  activePageUUID: '',
  // 画板中选中的元素uuid
  activeElementUUID: '',
  activeElement: null,
  // 历史操作数据用于undo redo
  historyCache: [],
  // redo undo 指针
  currentHistoryIndex: -1,
};

const editorReducer = (
  state = initialState,
  action: EditorActionTypes
): ProjectState => {
  switch (action.type) {
    case ADD_PAGE:
      return {
        projectData: {
          ...state.projectData,
          pages: state.projectData.pages.push(action.pageData),
        },
        ...state,
      };
    case DELETE_PAGE:
      return {
        projectData: {
          ...state.projectData,
          pages: state.projectData.pages.filter(
            (page) => page.pageId !== action.pageId
          ),
        },
        ...state,
      };
    case ADD_ELEMENT: {
      const pageIndex = state.projectData.pages.findIndex(
        (p) => p.pageId === state.activePageUUID
      );
      return produce(state, (draft) => {
        draft.projectData.pages[pageIndex].elements.push(action.elementData);
      });
    }
    case SET_ACTIVE_PAGE_UUID: {
      return {
        ...state,
        activePageUUID: action.pageId,
      };
    }
    case SET_ACTIVE_ELEMENT_UUID: {
      const pageIndex = state.projectData.pages.findIndex(
        (p) => p.pageId === state.activePageUUID
      );
      const currentElement = state.projectData.pages[pageIndex].elements.find(
        (ele) => ele.elementId === action.elementId
      );

      console.log(
        'SET_ACTIVE_ELEMENT_UUID state.activeElement= ',
        JSON.stringify(currentElement)
      );
      return {
        ...state,
        activeElement: currentElement,
        activeElementUUID: action.elementId,
      };
    }
    case CHANGE_ATTR: {
      // 改变元素本身的value 或 commonStyle里面的属性 或 propsValue里面的属性
      const { attrName, value } = action;
      const pageIndex = state.projectData.pages.findIndex(
        (p) => p.pageId === state.activePageUUID
      );
      return produce(state, (draft) => {
        const currentElement = draft.projectData.pages[pageIndex].elements.find(
          (ele) => ele.elementId === state.activeElementUUID
        );

        if (currentElement.hasOwnProperty(attrName)) {
          currentElement[attrName] = value;
        } else if (currentElement.commonStyle.hasOwnProperty(attrName)) {
          currentElement.commonStyle[attrName] = value;
        } else {
          currentElement.propsValue[attrName] = value;
        }

        // 记得更新activeElement！！！
        draft.activeElement = currentElement;
      });
    }
    case ADD_HISTORY_CACHE: {
      return produce(state, (draft) => {
        if (state.currentHistoryIndex + 1 < state.historyCache.length) {
          // 如果在此之前做过undo，则在插入新的history前 要删除currentHistoryIndex之后所有的记录
          draft.historyCache.splice(state.currentHistoryIndex + 1);
        }
        draft.historyCache.push({
          projectData: cloneDeep(state.projectData),
          activePageUUID: state.activePageUUID,
          activeElementUUID: state.activeElementUUID,
          activeElement: state.activeElement,
        });
        // 限制undo 纪录步数，最多支持100步操作undo
        draft.historyCache.splice(100);
        draft.currentHistoryIndex++;
      });
    }
    case UN_DO: {
      if (state.currentHistoryIndex > 0) {
        const prevState = state.historyCache[state.currentHistoryIndex - 1];
        const copyState = cloneDeep(prevState);
        return produce(state, (draft) => {
          draft.projectData = cloneDeep(copyState.projectData);
          draft.activePageUUID = copyState.activePageUUID;
          draft.activeElementUUID = copyState.activeElementUUID;
          draft.activeElement = copyState.activeElement;
          draft.currentHistoryIndex--;
        });
      }
    }
    case RE_DO: {
      if (state.historyCache.length - 1 > state.currentHistoryIndex) {
        const prevState = state.historyCache[state.currentHistoryIndex + 1];
        const copyState = cloneDeep(prevState);
        return produce(state, (draft) => {
          draft.projectData = cloneDeep(copyState.projectData);
          draft.activePageUUID = copyState.activePageUUID;
          draft.activeElementUUID = copyState.activeElementUUID;
          draft.activeElement = copyState.activeElement;
          draft.currentHistoryIndex++;
        });
      }
    }
    default:
      return state;
  }
};

export default editorReducer;
