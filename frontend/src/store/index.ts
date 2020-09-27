import { combineReducers } from 'redux';
import editorReducer from './editor/reducers';

export const rootReducer = combineReducers({
  editor: editorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// {editor: ProjectState}
