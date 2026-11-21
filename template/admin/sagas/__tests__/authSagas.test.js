import types from 'constants/actionTypes';
import { testSaga } from 'redux-saga-test-plan';
import { loginResult } from 'apis/auth';
import { signInSaga } from '../authSagas';

const payload = { phone: '0912345678', password: 'secret' };
const action = { type: types.SIGN_IN, payload };

describe('signInSaga', () => {
  it('should put SIGN_IN_SUCCESS with isAuth true and response data when api succeeds', () => {
    const data = { token: 'token-1', user: { id: 1 } };

    testSaga(signInSaga, action)
      .next()
      .call(loginResult, payload)
      .next({ data })
      .put({
        type: types.SIGN_IN_SUCCESS,
        payload: { isAuth: true, ...data },
      })
      .next()
      .isDone();
  });

  it('should put SIGN_IN_ERROR with mapped error message when api returns 401', () => {
    const error = { response: { status: 401, data: { message: 'invalid password' } } };

    testSaga(signInSaga, action)
      .next()
      .call(loginResult, payload)
      .throw(error)
      .put({
        type: types.SIGN_IN_ERROR,
        payload: { isAuth: false, message: '帳號或密碼錯誤' },
      })
      .next()
      .isDone();
  });

  it('should put SIGN_IN_ERROR with network error message when no response', () => {
    const error = {};

    testSaga(signInSaga, action)
      .next()
      .call(loginResult, payload)
      .throw(error)
      .put({
        type: types.SIGN_IN_ERROR,
        payload: { isAuth: false, message: '網路連線失敗，請確認網路狀態後再試' },
      })
      .next()
      .isDone();
  });
});
