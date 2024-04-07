import types from 'constants/actionTypes';
import {loginSaga, mockLogin } from '../authSagas';
import { testSaga } from 'redux-saga-test-plan';

test('loginSaga login success', () => {
  testSaga(loginSaga)
  .next()
  .call(mockLogin)
  .next()
  .put({
    type: types.SIGN_IN_SUCCESS,
    payload: {
      isAuth: true
    }
  })
  .next()
  .isDone();
});
