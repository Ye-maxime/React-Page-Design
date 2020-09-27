import {
  IPage, IElement, ADD_PAGE, DELETE_PAGE, ADD_ELEMENT, DELETE_ELEMENT, EditorActionTypes,
} from './types';

export function addPage(newPage: IPage): EditorActionTypes {
  return {
    type: ADD_PAGE,
    pageData: newPage,
  };
}

export function deletePage(pageId: string): EditorActionTypes {
  return {
    type: DELETE_PAGE,
    pageId,
  };
}

export function addElement(newElement: IElement): EditorActionTypes {
  return {
    type: ADD_ELEMENT,
    elementData: newElement,
  };
}

export function deleteElement(elementId: string): EditorActionTypes {
  return {
    type: DELETE_ELEMENT,
    elementId,
  };
}
