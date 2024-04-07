import { expectSaga } from 'redux-saga-test-plan';
import { loginSaga } from 'sagas/authSagas';
import authReducer from '../authReducer';

it('should set isAuth is true when sign in success', () => {
  return expectSaga(loginSaga)
    .withReducer(authReducer)
    .hasFinalState({
      isAuth: true,
    })

    .run();
});