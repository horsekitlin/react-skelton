import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuth) {
          return <Redirect to={{ pathname: '/login' }} />;
        }
        return <Component {...props} isAuth={isAuth} />
      }}
    />
  );
};
