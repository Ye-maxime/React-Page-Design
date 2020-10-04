/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import {
  ProjectState, ADD_PAGE, DELETE_PAGE, ADD_ELEMENT, DELETE_ELEMENT, EditorActionTypes,
} from './types';

const initialState: ProjectState = {
  projectData: {
    projectId: '1',
    name: 'project1',
    title: '未命名场景',
    description: '',
    script: '',
    width: 500,
    height: 500,
    pages: [{
      pageId: '1',
      name: 'page1',
      elements: [{
        elementId: '1',
        elementName: '按钮',
        value: '点我', // 绑定值
        valueType: 'string', // 值类型
        events: [],
      }],
    }],
  },
  // 当前正在编辑的页面uuid
  activePageUUID: '1',
  // 画板中选中的元素uuid
  activeElementUUID: '1',
};

const editorReducer = (
  state = initialState,
  action: EditorActionTypes,
): ProjectState => {
  switch (action.type) {
    case ADD_PAGE:
      return {
        projectData: { ...state.projectData, pages: state.projectData.pages.concat(action.pageData) },
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
      const index = state.projectData.pages.findIndex((v) => v.pageId === state.activePageUUID);
      console.log("projectData = " + JSON.stringify(state.projectData));
      return {
        projectData: { ...state.projectData, pages: state.projectData.pages[index].elements.push(action.elementData) },
        ...state,
      };
    }
    default:
      return state;
  }
};

export default editorReducer;
