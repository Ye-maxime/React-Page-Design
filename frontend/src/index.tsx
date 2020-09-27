import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './store/index';
import Hello from './components/Hello';

const store = createStore(rootReducer);

ReactDOM.render((
  <Provider store={store}>
    <Hello compiler="TypeScript" framework="React" />
  </Provider>), document.getElementById('root'));
