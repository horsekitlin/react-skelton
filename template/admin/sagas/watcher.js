import types from "constants/actionTypes";
import { takeLatest, takeEvery } from 'redux-saga/effects';
import { signInSaga } from "./authSagas";
import { createTasksSaga, deleteTasksSaga, getTasksSaga } from "./taskSagas";


export function* watchSignInSaga() {
  yield takeLatest(types.SIGN_IN, signInSaga);
}

export function* watchGetTasksSaga() {
  yield takeLatest(types.GET_TASKS, getTasksSaga);
}

export function* watchCreateTaskSaga() {
  yield takeEvery(types.CREATE_TASK, createTasksSaga);
}

export function* watchDeleteTaskSaga() {
  yield takeEvery(types.DELETE_TASK, deleteTasksSaga);
}
