import React from 'react';
import { useSelector } from 'react-redux'
import { useRoutes } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { authRoutes, noAuthRoutes } from './routes';

const App = () => {
  const isAuth = useSelector(({ auth }) => auth.isAuth);
  const routers = isAuth? authRoutes: noAuthRoutes;
  const routing = useRoutes(routers);
  
  return (
    <div>
      <CssBaseline />
      {routing}
    </div>
  );
}

export default App;
