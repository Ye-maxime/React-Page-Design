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
        elementName: 'element1',
        value: 'value', // 绑定值
        valueType: 'string', // 值类型
        events: [],
      }],
    }],
  },
};

const editorReducer = (
  state = initialState,
  action: EditorActionTypes,
): ProjectState => {
  switch (action.type) {
    case ADD_PAGE:
      return {
        projectData: { ...state.projectData, pages: state.projectData.pages.concat(action.pageData) },
      };
    case DELETE_PAGE:
      return {
        projectData: {
          ...state.projectData,
          pages: state.projectData.pages.filter(
            (page) => page.pageId !== action.pageId,
          ),
        },
      };
    // case ADD_ELEMENT:
    //     return {
    //       projectData: { ...state.projectData, pages: state.projectData.pages.find((page) => page.pageId === currentPageId) },
    //     };
    default:
      return state;
  }
};

export default editorReducer;
