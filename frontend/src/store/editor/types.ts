export interface ICommonStyle {
  [key: string]: any; // 定义一个映射类型
  width?: number;
  height?: number;
  color?: string;
  zIndex?: number;
  fontSize?: number;
}

export interface IPropsValue {
  [key: string]: any; // 定义一个映射类型
  placeholder?: string;
  //   fontSize?: number;
}

export interface IElement {
  elementId?: string;
  elementName: string;
  value: string; // 绑定值
  valueType: string; // 值类型
  events: [];
  commonStyle?: ICommonStyle;
  propsValue?: IPropsValue;
}

export interface IPage {
  pageId: string;
  name: string;
  elements: IElement[];
}

export interface IProject {
  projectId: string;
  name: string;
  title: string;
  description: string;
  script: string;
  width: number;
  height: number;
  pages: IPage[];
}

// State
export interface ProjectState {
  projectData: IProject;
  activePageUUID: string;
  activeElementUUID: string;
  activeElement: IElement;
}

// Actions & Action Creators
export const ADD_PAGE = 'ADD_PAGE';
export const DELETE_PAGE = 'DELETE_PAGE';
export const ADD_ELEMENT = 'ADD_ELEMENT';
export const DELETE_ELEMENT = 'DELETE_ELEMENT';
export const SET_ACTIVE_ELEMENT_UUID = 'SET_ACTIVE_ELEMENT_UUID';
export const CHANGE_ATTR = 'CHANGE_ATTR';

interface AddPageAction {
  type: typeof ADD_PAGE;
  pageData: IPage;
}

interface DeletePageAction {
  type: typeof DELETE_PAGE;
  pageId: string;
}

interface AddElementAction {
  type: typeof ADD_ELEMENT;
  elementData: IElement;
}

interface DeleteElementAction {
  type: typeof DELETE_ELEMENT;
  elementId: string;
}

interface SetActiveElementUUID {
  type: typeof SET_ACTIVE_ELEMENT_UUID;
  elementId: string;
}

interface ChangeAttr {
  type: typeof CHANGE_ATTR;
  attrName: string;
  value: number | string;
}

// eslint-disable-next-line max-len
export type EditorActionTypes =
  | AddPageAction
  | DeletePageAction
  | AddElementAction
  | DeleteElementAction
  | SetActiveElementUUID
  | ChangeAttr;
