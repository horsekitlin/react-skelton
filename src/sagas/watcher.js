import types from "../constants/actionTypes";
import { takeLatest } from 'redux-saga/effects';
import { loginSaga, logoutSaga } from './authSaga';

export function* watchLogin() {
  yield takeLatest(types.LOGIN, loginSaga);
}

export function* watchLogout() {
  yield takeLatest(types.LOGOUT, logoutSaga);
}