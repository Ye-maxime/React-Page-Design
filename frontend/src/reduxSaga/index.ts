import {
  projectFailure,
  addProjectSuccess,
  setProjectData,
} from '@store/editor/actions';
import { ADD_PROJECT, FETCH_PROJECT_DATA } from '@store/editor/types';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createRequestOptions } from '../common/utils';
import history from '../common/browserHistory';

function* addProject(action: any) {
  try {
    const options = createRequestOptions('POST', action.newProject);
    const res = yield call(
      fetch,
      'http://localhost:4000/api/projects/add',
      options
    );
    const newProject = yield res.json();
    yield put(addProjectSuccess(newProject));
    history.push(`/editor/${newProject.projectId}`);
  } catch (e) {
    yield put(projectFailure(e.message));
  }
}

function* fetchProjectData(action: any) {
  try {
    const options = createRequestOptions('GET');
    const res = yield call(
      fetch,
      `http://localhost:4000/api/projects/${action.projectId}`,
      options
    );
    const projectData = yield res.json();
    yield put(setProjectData(projectData));
  } catch (e) {
    yield put(projectFailure(e.message));
  }
}

function* rootSaga() {
  yield takeLatest(ADD_PROJECT, addProject);
  yield takeLatest(FETCH_PROJECT_DATA, fetchProjectData);
}

export default rootSaga;
