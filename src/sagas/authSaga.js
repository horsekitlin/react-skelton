import { put, call } from 'redux-saga/effects';
import types from "../constants/actionTypes";
import { saveLoginUser, removeLoginUser } from '../store/localStorage';

const MOCK_USER = {
  info: {
    employeeName: 'administrator',
    roleName: 'admin',
  },
  permissions: {
    elements: {
      read: true,
      add: true,
      update: true,
      delete: true,
    },
    settings: {
      read: true,
      add: false,
      update: false,
      delete: false,
    },
    accounts: {
      read: true,
      add: false,
      update: false,
      delete: false,
    },
    roles: {
      read: true,
      add: false,
      update: false,
      delete: false,
    },
  },
};

export const mockLogin = () => new Promise(resolve =>
  setTimeout(() => {
    resolve();
  }, 1000)
);

export const okLogin = () => ({
  type: types.LOGIN_SUCCESS,
  payload: {
    ok: true
  }
});

export function* loginSaga() {
  try {
    yield call(mockLogin);
    
    saveLoginUser(MOCK_USER);

    yield put(okLogin());
  } catch (error) {
    yield put({
      type: types.LOGIN,
      payload: {
        ok: false
      }
    });
  }
}

const okLogout = (payload) => ({
  type: types.LOGOUT_SUCCESS,
  payload,
});

const errLogout = () => ({
  type: types.LOGOUT_ERROR,
});

export function* logoutSaga({ payload }) {
  try {
    removeLoginUser();
    yield put(okLogout(
      { ok: false }
    ));
  } catch (error) {
    yield put(errLogout());
  }
}
