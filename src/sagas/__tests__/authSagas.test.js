import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { loginSaga, okLogin, mockLogin } from '../authSaga';
import moment from 'moment';
import authState from '../../reducers/initialState';
import authReducer, { loginSuccess } from '../../reducers/authReducer';

const loginActionObject = {
  payload: {}
};

const respObject = {
  ok: true,
  result: {
    expireTime: moment().add(5, 'days').format('YYYY-MM-DD hh:mm:ss'),
    token:
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2b2wyMDE5MDYxMDEwMTV8MTA3NjF8MTU2MDg1MDAxNDMxMCIsImV4cCI6MTU2MTQ1NDgxNH0.fZ7qztdDLQ-8uf4sqke_rK8JYwgukOM1kVIVWkuvXd7CgZ2acfIY-yEvmUc488tC3Wk4ha11axfZ4iI3yUZs8Q',
  }
};

describe('authSagas > loginSaga', () => {
  it('should login success', () => {

    testSaga(loginSaga, loginActionObject)
      .next()
      .call(mockLogin)
      .next(respObject)
      .put(okLogin())
      .next()
      .isDone();
  });


  it('should login success with Reducer validate Store State', async () => {
    const okLoginSuccessAction = okLogin();

    const { storeState } = await expectSaga(loginSaga, loginActionObject)
      .withReducer(authReducer, authState)
      .provide([
        [call(mockLogin), respObject]
      ])
      .put(okLoginSuccessAction)
      .run();

    const expectAuthState = loginSuccess(storeState, {});

    expect(storeState).toEqual(expectAuthState)
  });
});
