import {put, call} from 'redux-saga/effects';
import types from 'constants/actionTypes';
import {loginResult} from 'apis/auth';

const okSignIn = (data) => {
  return {
    type: types.SIGN_IN_SUCCESS,
    payload: {
      isAuth: true,
      ...data,
    },
  };
};

const errSignIn = (message) => {
  return {
    type: types.SIGN_IN_ERROR,
    payload: {
      isAuth: false,
      message,
    },
  };
};

export function* signInSaga({payload = {}}) {
  try {
    const response = yield call(loginResult, payload);
    yield put(okSignIn(response.data));
  } catch (error) {
    yield put(errSignIn(error.response.data.message));
  }
}
