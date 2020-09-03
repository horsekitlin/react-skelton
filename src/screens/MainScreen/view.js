import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import PrivateRoute from '~/components/PrivateRoute';
import PublicRoute from '~/components/PublicRoute';
import ErrorPage from '../ErrorPageScreen';
import ElementScreen from "../ElementScreen";
import LoginScreen from '../LoginScreen';
import AccountScreen from '../AccountScreen';
import RoleScreen from '../RoleScreen';
import ErrorBoundary from '~/components/ErrorBoundary';
import LayoutWrapper from '~/components/LayoutWrapper';
import theme from '~/constants/theme';

const MainScreen = (props) => {
  const { isAuth } = props;
  const [, setInitApp] = useState(false);

  useEffect(() => {
    setInitApp(true);
  }, [setInitApp]);

  return (
    <MuiThemeProvider theme={theme}>
      {/* ErrorBoundary had already in LayoutWrapper, not sure whether should put again or not? */}
      <ErrorBoundary>
        <Router>
          <LayoutWrapper>
            <Switch>
              <PublicRoute exact isAuth={isAuth} path='/login' component={LoginScreen} />
              <PrivateRoute
                exact
                path='/'
                isAuth={isAuth}
                component={ElementScreen} />
              <PrivateRoute
                exact
                path='/system/account'
                isAuth={isAuth}
                component={AccountScreen}
              />
              <PrivateRoute
                exact
                path='/system/role'
                isAuth={isAuth}
                component={RoleScreen}
              />
              <Route exact component={ErrorPage} />
            </Switch>
          </LayoutWrapper>
        </Router>
      </ErrorBoundary>
    </MuiThemeProvider>
  );
}

export default MainScreen;