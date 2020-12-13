import { ICommonStyle, IElement, ProjectState } from '@store/editor/types';
import { createSelector } from 'reselect';

const getActiveElementUUID = (state: ProjectState) => state.activeElementUUID;

const getActivePageUUID = (state: ProjectState) => state.activePageUUID;

const getProjectData = (state: ProjectState) => state.projectData;

const getCurrentHistoryIndex = (state: ProjectState) => state.currentHistoryIndex;

const getHistoryCache = (state: ProjectState) => state.historyCache;

// 类似于vuex的getters 计算衍生属性
export const getActiveElement = createSelector(
  [getActiveElementUUID, getActivePageUUID, getProjectData],
  (activeElementUUID, activePageUUID, projectData) => {
    if (projectData.pages.length === 0) {
      return null;
    }
    const currentPageIndex = projectData.pages.findIndex((page) => page.pageId === activePageUUID);
    if (currentPageIndex === -1) {
      return null;
    }
    return projectData.pages[currentPageIndex].elements.find((element) => element.elementId === activeElementUUID);
  },
);

export const canUndo = createSelector(
  [getCurrentHistoryIndex],
  (currentHistoryIndex) => currentHistoryIndex > 0,
);

export const canRedo = createSelector(
  [getCurrentHistoryIndex, getHistoryCache],
  (currentHistoryIndex, historyCache) => historyCache.length > currentHistoryIndex + 1,
);
