/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import produce from 'immer'; // https://www.pluralsight.com/guides/deeply-nested-objectives-redux
import {
  ProjectState,
  ADD_PAGE,
  DELETE_PAGE,
  ADD_ELEMENT,
  DELETE_ELEMENT,
  SET_ACTIVE_ELEMENT_UUID,
  CHANGE_FONT_SIZE,
  EditorActionTypes,
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
      {
        pageId: '1',
        name: 'page1',
        elements: [
          {
            elementId: '1',
            elementName: '按钮',
            value: '点我', // 绑定值
            valueType: 'string', // 值类型
            events: [],
          },
        ],
      },
    ],
  },
  // 当前正在编辑的页面uuid
  activePageUUID: '1',
  // 画板中选中的元素uuid
  activeElementUUID: '',
  activeElement: null,
};

const editorReducer = (
  state = initialState,
  action: EditorActionTypes,
): ProjectState => {
  switch (action.type) {
    case ADD_PAGE:
      return {
        projectData: {
          ...state.projectData,
          pages: state.projectData.pages.concat(action.pageData),
        },
        ...state,
      };
    case DELETE_PAGE:
      return {
        projectData: {
          ...state.projectData,
          pages: state.projectData.pages.filter(
            (page) => page.pageId !== action.pageId,
          ),
        },
        ...state,
      };
    case ADD_ELEMENT: {
      const pageIndex = state.projectData.pages.findIndex(
        (p) => p.pageId === state.activePageUUID,
      );
      return produce(state, (draft) => {
        draft.projectData.pages[pageIndex].elements.push(action.elementData);
      });
    }
    case SET_ACTIVE_ELEMENT_UUID: {
      const pageIndex = state.projectData.pages.findIndex(
        (p) => p.pageId === state.activePageUUID,
      );
      const currentElement = state.projectData.pages[pageIndex].elements.find((ele) => ele.elementId === action.elementId);

      console.log('SET_ACTIVE_ELEMENT_UUID state.activeElement= ', JSON.stringify(currentElement));
      return { ...state, activeElement: currentElement, activeElementUUID: action.elementId };
    }
    case CHANGE_FONT_SIZE: {
      const pageIndex = state.projectData.pages.findIndex(
        (p) => p.pageId === state.activePageUUID,
      );
      return produce(state, (draft) => {
        const currentElement = draft.projectData.pages[pageIndex].elements.find((ele) => ele.elementId === state.activeElementUUID);
        currentElement.commonStyle.fontSize = action.fontSize;
      });
    }
    default:
      return state;
  }
};

export default editorReducer;
