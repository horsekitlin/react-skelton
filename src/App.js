import React from 'react';
import { useRoutes } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import routes from './routes';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <div>
      <CssBaseline />
      {routing}
    </div>
  );
}

export default App;
