import types from "constants/actionTypes";
import { takeLatest } from 'redux-saga/effects';
import { signInSaga } from "./authSagas";
import { createTasksSaga, deleteTasksSaga, getTasksSaga } from "./taskSagas";


export function* watchSignInSaga() {
  yield takeLatest(types.SIGN_IN, signInSaga);
}

export function* watchGetTasksSaga() {
  yield takeLatest(types.GET_TASKS, getTasksSaga);
}

export function* watchCreateTaskSaga() {
  yield takeLatest(types.CREATE_TASK, createTasksSaga);
}

export function* watchDeleteTaskSaga() {
  yield takeLatest(types.DELETE_TASK, deleteTasksSaga);
}
