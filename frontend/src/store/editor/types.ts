export interface ICommonStyle {
  width: number;
  height: number;
  color: string;
  zIndex: number;
  fontSize: number;
  top: number;
  left: number;
  rotate: number;
  [key: string]: any; // 定义一个映射类型
}

export interface IPropsValue {
  text?: string;
  placeholder?: string;
  //   fontSize?: number;
  [key: string]: any; // 定义一个映射类型
}

export interface IElement {
  elementId: string;
  elementName: string;
  value: string; // 绑定值
  valueType: string; // 值类型
  events: [];
  commonStyle: ICommonStyle;
  propsValue?: IPropsValue;
  [key: string]: any; // 定义一个映射类型
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

export interface IHistoryCache {
  projectData: IProject;
  activePageUUID: string;
  activeElementUUID: string;
}

// 此接口用于定义 frontend/node_modules/@types/react/index.d.ts 里面React.createElement函数的props参数的类型P
// props?: Attributes & P | null,
export interface IRdpElement {
  element?: IElement;
  //   setActiveElementUUID?: (elementId: string) => EditorActionTypes;
  changeAttr?: (attrName: string, value: number | string) => EditorActionTypes;
  addHistoryCache?: () => EditorActionTypes;
}

// State
export interface ProjectState {
  projectData: IProject;
  activePageUUID: string;
  activeElementUUID: string;
  historyCache: IHistoryCache[];
  currentHistoryIndex: number;
  loading: boolean;
}

// Actions & Action Creators
export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const PROJECT_FAILURE = 'PROJECT_FAILURE';
export const ADD_PAGE = 'ADD_PAGE';
export const DELETE_PAGE = 'DELETE_PAGE';
export const ADD_ELEMENT = 'ADD_ELEMENT';
export const DELETE_ELEMENT = 'DELETE_ELEMENT';
export const SET_ACTIVE_PAGE_UUID = 'SET_ACTIVE_PAGE_UUID';
export const SET_ACTIVE_ELEMENT_UUID = 'SET_ACTIVE_ELEMENT_UUID';
export const CHANGE_ATTR = 'CHANGE_ATTR';
export const ADD_HISTORY_CACHE = 'ADD_HISTORY_CACHE';
export const UN_DO = 'UN_DO';
export const RE_DO = 'RE_DO';
export const RESIZE_ELEMENT = 'RESIZE_ELEMENT';
export const FETCH_PROJECT_DATA = 'FETCH_PROJECT_DATA';
export const SET_PROJECT_DATA = 'SET_PROJECT_DATA';

interface AddProjectAction {
  type: typeof ADD_PROJECT;
  newProject: IProject;
}

interface AddProjectSuccessAction {
  type: typeof ADD_PROJECT_SUCCESS;
  newProject: IProject;
}

interface ProjectFailureAction {
  type: typeof PROJECT_FAILURE;
  error: string;
}

interface AddPageAction {
  type: typeof ADD_PAGE;
  newPage: IPage;
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

interface SetActivePageUUIDAction {
  type: typeof SET_ACTIVE_PAGE_UUID;
  pageId: string;
}

interface SetActiveElementUUIDAction {
  type: typeof SET_ACTIVE_ELEMENT_UUID;
  elementId: string;
}

interface ChangeAttrAction {
  type: typeof CHANGE_ATTR;
  attrName: string;
  value: number | string;
}

interface AddHistoryCacheAction {
  type: typeof ADD_HISTORY_CACHE;
}

interface UndoAction {
  type: typeof UN_DO;
}

interface RedoAction {
  type: typeof RE_DO;
}

interface ResizeElementAction {
  type: typeof RESIZE_ELEMENT;
  commonStyle: ICommonStyle;
}

interface FetchProjectDataAction {
  type: typeof FETCH_PROJECT_DATA;
  projectId: string;
}

interface SetProjectDataAction {
  type: typeof SET_PROJECT_DATA;
  projectData: IProject;
}

// eslint-disable-next-line max-len
export type EditorActionTypes =
  | AddProjectAction
  | AddProjectSuccessAction
  | ProjectFailureAction
  | AddPageAction
  | DeletePageAction
  | AddElementAction
  | DeleteElementAction
  | SetActivePageUUIDAction
  | SetActiveElementUUIDAction
  | ChangeAttrAction
  | AddHistoryCacheAction
  | UndoAction
  | RedoAction
  | ResizeElementAction
  | FetchProjectDataAction
  | SetProjectDataAction;
