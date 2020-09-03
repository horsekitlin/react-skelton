import types from '../constants/actionTypes';
import { basicAsyncActionTypes } from '../constants/actionTypes';

const responseRegExp = /_SUCCESS|_ERROR/;

export const startFetchingMiddleware = store => next => action => {
  const isBasicAsyncAction = basicAsyncActionTypes.includes(action.type);

  if (isBasicAsyncAction) {
    store.dispatch({ type: types.START_FETCHING, payload: action.type });
  }
  return next(action);
};

export const stopFetchingMiddleware = store => next => action => {
  const isResponseAction = responseRegExp.test(action.type);
  const basicType = action.type.replace(responseRegExp, '');
  const isBasicAsyncAction = basicAsyncActionTypes.includes(basicType);
  if (isBasicAsyncAction && isResponseAction) {
    store.dispatch({ type: types.STOP_FETCHING, payload: basicType });
  }
  return next(action);
};