import * as React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route } from 'react-router-dom';
import Loading from './pages/Loading';
import './assets/css/App.scss';
import './assets/css/RdpComponent.scss';

const AsyncHome = Loadable({
  loader: () => import('./pages/Home'),
  loading: Loading,
});

const AsyncEditor = Loadable({
  loader: () => import('./pages/Editor'),
  loading: Loading,
});

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={AsyncHome} />
      <Route exact path="/editor/:projectId" component={AsyncEditor} />
    </Switch>
  </div>
);

export default App;
