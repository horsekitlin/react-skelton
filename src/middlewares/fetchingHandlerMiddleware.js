import types from '../constants/actionTypes';
import { basicAsyncActionTypes } from '../constants/actionTypes';

export const startFetchingMiddleware = store => next => action => {
  const isAsyncAction = basicAsyncActionTypes.includes(action.type);
  if(isAsyncAction) store.dispatch({type: types.START_FETCHING});
  return next(action);
};

export const stopFetchingMiddleware = store => next => action => {
  if(action['@@redux-saga/SAGA_ACTION']) store.dispatch({type: types.STOP_FETCHING});
  return next(action);
};