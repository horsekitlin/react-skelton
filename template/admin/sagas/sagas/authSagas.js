import { put, call } from 'redux-saga/effects';
import types from "constants/actionTypes";

const mockLogin = () => new Promise(resolve =>
  setTimeout(() => {
    resolve();
  }, 1000)
);

const okSignIn = () => {  
  return {
    type: types.SIGN_IN_SUCCESS,
    payload: {
      isAuth: true
    }
  };
}

const errSignIn = () => {
  return {
    type: types.SIGN_IN_ERROR,
    payload: {
      isAuth: true
    }
  };
};

export function* loginSaga() {
  try {
    yield call(mockLogin);
    yield put(okSignIn());
  } catch (error) {
    yield put(errSignIn(error));
  }
}