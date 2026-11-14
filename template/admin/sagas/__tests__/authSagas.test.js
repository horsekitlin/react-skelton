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

  it('should put SIGN_IN_ERROR with the api error message when api fails', () => {
    const error = { response: { data: { message: 'invalid password' } } };

    testSaga(signInSaga, action)
      .next()
      .call(loginResult, payload)
      .throw(error)
      .put({
        type: types.SIGN_IN_ERROR,
        payload: { isAuth: false, message: 'invalid password' },
      })
      .next()
      .isDone();
  });
});
