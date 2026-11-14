import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import types from 'constants/actionTypes';
import { loginResult } from 'apis/auth';
import { signInSaga } from 'sagas/authSagas';
import authReducer from '../authReducer';
import initialState from '../initialState';

describe('authReducer', () => {
  it('should return the initial auth state', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual(initialState.auth);
  });

  it('should merge payload into state when sign in success', () => {
    const payload = { isAuth: true, token: 'token-1', user: { id: 1 } };

    expect(authReducer(initialState.auth, { type: types.SIGN_IN_SUCCESS, payload })).toEqual({
      isAuth: true,
      token: 'token-1',
      user: { id: 1 },
    });
  });

  it('should clear auth state when sign in error', () => {
    const signedIn = { isAuth: true, token: 'token-1', user: { id: 1 } };

    expect(authReducer(signedIn, { type: types.SIGN_IN_ERROR, payload: { message: 'failed' } })).toEqual({
      isAuth: false,
      token: '',
      user: {},
    });
  });

  it('should set isAuth true when signInSaga succeeds', () => {
    const payload = { phone: '0912345678', password: 'secret' };
    const data = { token: 'token-1', user: { id: 1 } };

    return expectSaga(signInSaga, { type: types.SIGN_IN, payload })
      .provide([[call(loginResult, payload), { data }]])
      .withReducer(authReducer)
      .hasFinalState({ isAuth: true, ...data })
      .run();
  });
});
