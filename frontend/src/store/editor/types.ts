export interface IElement {
  elementId: string
  elementName: string
  value: string // 绑定值
  valueType: string // 值类型
  events: []
}

export interface IPage {
  pageId: string
  name: string
  elements: IElement[]
}

export interface IProject {
  projectId: string
  name: string
  title: string
  description: string
  script: string
  width: number
  height: number
  pages: IPage[]
}

// State
export interface ProjectState {
  projectData: IProject
}

// Actions & Action Creators
export const ADD_PAGE = 'ADD_PAGE';
export const DELETE_PAGE = 'DELETE_PAGE';
export const ADD_ELEMENT = 'ADD_ELEMENT';
export const DELETE_ELEMENT = 'DELETE_ELEMENT';

interface AddPageAction {
  type: typeof ADD_PAGE
  pageData: IPage
}

interface DeletePageAction {
  type: typeof DELETE_PAGE
  pageId: string
}

interface AddElementAction {
  type: typeof ADD_ELEMENT
  elementData: IElement
}

interface DeleteElementAction {
  type: typeof DELETE_ELEMENT
  elementId: string
}

// eslint-disable-next-line max-len
export type EditorActionTypes = AddPageAction | DeletePageAction | AddElementAction | DeleteElementAction
