import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './views/Home';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </HashRouter>
  );
}

export default App;
