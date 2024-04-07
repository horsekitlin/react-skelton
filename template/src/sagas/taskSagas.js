import types from 'constants/actionTypes';
import {createTaskResult, deleteTaskResult, getTasksResult} from 'apis/tasks';
import fetchAPIResult from "utils/sagaHelper";

export function* createTaskSaga({payload: {onSuccess, ...payload}}) {
  return yield fetchAPIResult({
    apiResult: createTaskResult,
    actionType: types.CREATE_TASK,
    payload,
    onSuccess,
  });
}

export function* deleteTaskSaga({payload: {onSuccess, ...payload}}) {
  return yield fetchAPIResult({
    apiResult: deleteTaskResult,
    actionType: types.DELETE_TASK,
    payload,
    onSuccess,
  });
}

export function* getTasksSaga({payload}) {
  return yield fetchAPIResult({
    apiResult: getTasksResult,
    actionType: types.GET_TASKS,
    payload,
  });
}
