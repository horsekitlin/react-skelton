import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeScene from './screens/HomeScreen';

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={HomeScene} />
      <Route component={() => <div>404</div>} />
    </Switch>
  </Router>
);