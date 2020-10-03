import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './store/index';
import Editor from './pages/Editor';

const store = createStore(rootReducer);

ReactDOM.render((
  <Provider store={store}>
    <Editor />
  </Provider>), document.getElementById('root'));
