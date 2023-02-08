import initialState from 'reducers/initialState';
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { loginSaga, mockLogin } from 'sagas/authSagas';
import authReducer from '../authReducer';

it('should set isAuth is true when sign in success', () => {
  return expectSaga(loginSaga)
    .withReducer(authReducer, initialState.auth)
    .provide([
      [call(mockLogin), {}]
    ])
    .hasFinalState({
      isAuth: true,
    })

    .run(500);
});