import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import {
  startFetchingMiddleware,
  stopFetchingMiddleware,
} from 'middlewares/fetchingMiddleware';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware({});
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const middlewares = [
      startFetchingMiddleware,
      sagaMiddleware,
      stopFetchingMiddleware,
    ];

  const store = {
    ...createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(...middlewares))
    ),
    runSaga: sagaMiddleware.run(rootSaga)
  };

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/index', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};

export default configureStore;
