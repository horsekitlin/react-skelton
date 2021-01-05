import React, { Fragment } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

const App = () => {
  const routing = useRoutes(routes);
  console.log('🚀 ~ file: App.js ~ line 7 ~ App ~ routing', routing)

  return (
    <div>
      {routing}
    </div>
  );
}

export default App;
