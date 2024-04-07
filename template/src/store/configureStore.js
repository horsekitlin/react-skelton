import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import {
  startFetchingMiddleware,
  stopFetchingMiddleware,
} from 'middlewares/fetchingMiddleware';

const persistConfig = {
  storage,
  key: '!&@#$%^drcleaneradmin',
  blacklist: [],
};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware({});
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middlewares = [
    startFetchingMiddleware,
    sagaMiddleware,
    stopFetchingMiddleware,
  ];

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const prevanteStore = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  const persistor = persistStore(prevanteStore);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/index', () => {
      const nextRootReducer = require('../reducers/index');
      prevanteStore.replaceReducer(nextRootReducer);
    });
  }
  return {
    persistor,
    store: {
      ...prevanteStore,
      runSaga: sagaMiddleware.run(rootSaga),
    },
  };
};

const {store, persistor} = configureStore();

export {persistor};
export default store;
