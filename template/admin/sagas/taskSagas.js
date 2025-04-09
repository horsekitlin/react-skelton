import {put, call, select} from 'redux-saga/effects';
import types from 'constants/actionTypes';
import {createTaskResult, deleteTaskResult, getTasksResult} from 'apis/tasks';

const okCreateTask = (payload) => {
  return {
    type: types.CREATE_TASK_SUCCESS,
    payload
  };
};

const errCreateTask = (message) => {
  return {
    type: types.CREATE_TASK_ERROR,
    payload: {
      message,
    },
  };
};

export function* createTasksSaga({payload: {onSuccess, ...payload}}) {
  try {
    const token = yield select(({auth}) => auth.token);

    const {data: response} = yield call(createTaskResult, {
        customHeaders: {Authorization: `Bearer ${token}`},
        payload,
    });
    yield put(okCreateTask(response));
    onSuccess();
  } catch (error) {
    yield put(errCreateTask(error.response.data.message));
  }
}

const okDeleteTask = (payload) => {
  return {
    type: types.DELETE_TASK_SUCCESS,
    payload
  };
};

const errDeleteTask = (message) => {
  return {
    type: types.DELETE_TASK_ERROR,
    payload: {
      message,
    },
  };
};

export function* deleteTasksSaga({payload: {onSuccess, ...payload}}) {
  try {
    const token = yield select(({auth}) => auth.token);

    const {data: response} = yield call(deleteTaskResult, {
        customHeaders: {Authorization: `Bearer ${token}`},
        payload,
    });
    yield put(okDeleteTask(response));
    onSuccess();
  } catch (error) {
    yield put(errDeleteTask(error.response.data.message));
  }
}

const okGetTasks = (payload) => {
  return {
    type: types.GET_TASKS_SUCCESS,
    payload
  };
};

const errGetTasks = (message) => {
  return {
    type: types.GET_TASKS_ERROR,
    payload: {
      message,
    },
  };
};

export function* getTasksSaga({payload}) {
  try {
    const token = yield select(({auth}) => auth.token);

    const {data: response} = yield call(getTasksResult, {
        customHeaders: {Authorization: `Bearer ${token}`},
        payload,
    });
    yield put(okGetTasks(response));
  } catch (error) {
    yield put(errGetTasks(error.response.data.message));
  }
}
