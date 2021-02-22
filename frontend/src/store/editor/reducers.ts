/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import produce from 'immer'; // https://www.pluralsight.com/guides/deeply-nested-objectives-redux
import cloneDeep from 'lodash/cloneDeep';

import {
  ProjectState,
  ADD_PROJECT,
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
  RESIZE_ELEMENT,
  PROJECT_FAILURE,
  ADD_PROJECT_SUCCESS,
  IProject,
  SET_PROJECT_DATA,
  FETCH_PROJECT_DATA,
  UPDATE_PROJECT_CONFIG,
} from './types';

const initialState: ProjectState = {
  //   projectData: {
  //     projectId: '1',
  //     name: 'project1',
  //     title: '未命名场景',
  //     description: '',
  //     script: '',
  //     width: 500,
  //     height: 500,
  //     pages: [
  //       {
  //         pageId: '1',
  //         name: 'page1',
  //         elements: [
  //           {
  //             elementId: '1',
  //             elementName: '按钮',
  //             value: '点我', // 绑定值
  //             valueType: 'string', // 值类型
  //             events: [],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  projectData: null,
  // 当前正在编辑的页面uuid
  activePageUUID: '',
  // 画板中选中的元素uuid
  activeElementUUID: '',
  // 历史操作数据用于undo redo
  historyCache: [],
  // redo undo 指针
  currentHistoryIndex: -1,
  loading: false,
};

const editorReducer = (
  state = initialState,
  action: EditorActionTypes,
): ProjectState => {
  switch (action.type) {
    case ADD_PROJECT: {
      return { ...state, loading: true };
    }
    case ADD_PROJECT_SUCCESS: {
      const { newProject } = action;
      return {
        ...state, // ...state 必须写前面才会被覆盖！！！
        projectData: newProject,
        activePageUUID: newProject.pages[0].pageId,
        activeElementUUID: '',
        historyCache: [],
        currentHistoryIndex: -1,
        loading: false,
      };
    }
    case PROJECT_FAILURE: {
      return { ...state, loading: false };
    }
    case ADD_PAGE: {
      return {
        ...state,
        projectData: {
          ...state.projectData,
          pages: state.projectData.pages.concat(action.newPage),
        },
      };
    }
    case DELETE_PAGE: {
      return {
        ...state,
        projectData: {
          ...state.projectData,
          pages: state.projectData.pages.filter(
            (page) => page.pageId !== action.pageId,
          ),
        },
      };
    }
    case ADD_ELEMENT: {
      const pageIndex = state.projectData.pages.findIndex(
        (p) => p.pageId === state.activePageUUID,
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
      return {
        ...state,
        activeElementUUID: action.elementId,
      };
    }
    case CHANGE_ATTR: {
      console.log('CHANGE_ATTR ', action.attrName);
      // 改变元素本身的value 或 commonStyle里面的属性 或 propsValue里面的属性
      const { attrName, value } = action;
      const pageIndex = state.projectData.pages.findIndex(
        (p) => p.pageId === state.activePageUUID,
      );
      return produce(state, (draft) => {
        const currentElement = draft.projectData.pages[pageIndex].elements.find(
          (ele) => ele.elementId === state.activeElementUUID,
        );

        if (Object.prototype.hasOwnProperty.call(currentElement, attrName)) {
          currentElement[attrName] = value;
        } else if (Object.prototype.hasOwnProperty.call(currentElement.commonStyle, attrName)) {
          currentElement.commonStyle[attrName] = value;
        } else {
          currentElement.propsValue[attrName] = value;
        }
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
        });
        // 限制undo 纪录步数，最多支持100步操作undo
        draft.historyCache.splice(100);
        draft.currentHistoryIndex++;
      });
    }
    case RESIZE_ELEMENT: {
      const pageIndex = state.projectData.pages.findIndex(
        (p) => p.pageId === state.activePageUUID,
      );
      return produce(state, (draft) => {
        const currentElement = draft.projectData.pages[pageIndex].elements.find(
          (ele) => ele.elementId === state.activeElementUUID,
        );

        currentElement.commonStyle = action.commonStyle;
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
          draft.currentHistoryIndex--;
        });
      }
      // 返回原来状态 ！！！！
      return {
        ...state,
      };
    }
    case RE_DO: {
      if (state.historyCache.length - 1 > state.currentHistoryIndex) {
        const prevState = state.historyCache[state.currentHistoryIndex + 1];
        const copyState = cloneDeep(prevState);
        return produce(state, (draft) => {
          draft.projectData = cloneDeep(copyState.projectData);
          draft.activePageUUID = copyState.activePageUUID;
          draft.activeElementUUID = copyState.activeElementUUID;
          draft.currentHistoryIndex++;
        });
      }
      // 返回原来状态 ！！！！
      return {
        ...state,
      };
    }
    case FETCH_PROJECT_DATA: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_PROJECT_DATA: {
      const { projectData } = action;
      return {
        ...state,
        loading: false,
        projectData,
        activePageUUID: projectData.pages[0].pageId,
        activeElementUUID: '',
        historyCache: [],
        currentHistoryIndex: -1,
      };
    }
    case UPDATE_PROJECT_CONFIG: {
      const { attribute, value } = action;
      return {
        ...state,
        projectData: {
          ...state.projectData,
          [attribute]: value,
        },
      };
    }
    default:
      return state;
  }
};

export default editorReducer;
