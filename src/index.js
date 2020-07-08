import React from 'react';
import ReactDOM from 'react-dom';
import { WebGLRenderer } from 'three';
import { Provider } from 'react-redux'
import * as serviceWorker from './registerServiceWorker';
import 'reset-css';
import "react-datepicker/dist/react-datepicker.css";
import reduxStore from './store/configureStore'
import MainScreen from './screens/MainScreen';

const rootEl = document.getElementById('root');
const renderer = new WebGLRenderer({ antialias: true })

ReactDOM.render(
  <Provider store={reduxStore}  >
    <MainScreen />
  </Provider>
  , rootEl
);

serviceWorker.unregister();

if (module.hot) {
  module.hot.accept('./screens/MainScreen/index', () => {
    const NextApp = require('./screens/MainScreen/index').default
    ReactDOM.render(
      <Provider store={reduxStore} >
        <NextApp renderer={renderer} />
      </Provider>,
      rootEl
    )
  })
}