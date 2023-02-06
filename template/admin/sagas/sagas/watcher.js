import types from "constants/actionTypes";
import { takeLatest } from 'redux-saga/effects';
import { loginSaga } from "./authSagas";

export function* watchLogin() {
  yield takeLatest(types.SIGN_IN, loginSaga);
}
