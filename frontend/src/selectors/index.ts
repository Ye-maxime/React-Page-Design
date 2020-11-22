import { ICommonStyle, IElement, ProjectState } from '@store/editor/types';
import { createSelector } from 'reselect';

const getActiveElementUUID = (state: ProjectState) => {
  return state.activeElementUUID;
};

const getActivePageUUID = (state: ProjectState) => {
  return state.activePageUUID;
};

const getProjectData = (state: ProjectState) => {
  return state.projectData;
};

const getCurrentHistoryIndex = (state: ProjectState) => {
  return state.currentHistoryIndex;
};

const getHistoryCache = (state: ProjectState) => {
  return state.historyCache;
};

// 类似于vuex的getters 计算衍生属性
export const getActiveElement = createSelector(
  [getActiveElementUUID, getActivePageUUID, getProjectData],
  (activeElementUUID, activePageUUID, projectData) => {
    if (projectData.pages.length === 0) {
      return null;
    }
    const currentPageIndex = projectData.pages.findIndex((page) => {
      return page.pageId === activePageUUID;
    });
    if (currentPageIndex === -1) {
      return null;
    }
    return projectData.pages[currentPageIndex].elements.find((element) => {
      return element.elementId === activeElementUUID;
    });
  }
);

export const canUndo = createSelector(
  [getCurrentHistoryIndex],
  (currentHistoryIndex) => {
    return currentHistoryIndex > 0;
  }
);

export const canRedo = createSelector(
  [getCurrentHistoryIndex, getHistoryCache],
  (currentHistoryIndex, historyCache) => {
    return historyCache.length > currentHistoryIndex + 1;
  }
);
