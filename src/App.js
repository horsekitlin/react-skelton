import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeScene from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/singin" component={SignInScreen} />
        <Route exact path="/" component={HomeScene} />
        <Route component={() => <div>404</div>} />
      </Switch>
    </Router>
  );
}

export default App;
