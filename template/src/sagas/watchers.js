// import types from 'constants/actionTypes';
// import { takeLatest } from 'redux-saga/effects';
// import { loginSaga } from './user';

// export function* watchLogin() {
//   yield takeLatest(types.SIGNIN, loginSaga);
// }

// import { take, actionChannel, call } from 'redux-saga/effects'

// function* watchRequests() {
//   // 1- Create a channel for request actions
//   const requestChan = yield actionChannel('REQUEST')
//   while (true) {
//     // 2- take from the channel
//     const {payload} = yield take(requestChan)
//     // 3- Note that we're using a blocking call
//     yield call(handleRequest, payload)
//   }
// }

// function* handleRequest(payload) { 

//  }