import {applyMiddleware, compose, legacy_createStore as createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import {
  startFetchingMiddleware,
  stopFetchingMiddleware,
} from 'middlewares/fetchingMiddleware';

const persistConfig = {
  storage,
  key: '!&@#$%^drcleaneradmin',
  blacklist: ['fetching'],
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
  if (import.meta.hot) {
    // 開發時熱替換 reducers
    import.meta.hot.accept('../reducers/index', (nextModule) => {
      prevanteStore.replaceReducer(
        persistReducer(persistConfig, nextModule.default),
      );
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
