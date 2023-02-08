import types from '~/constants/actionTypes';
import {authState} from './initialState';

const loginSuccess = (auth, payload) => ({
  ...auth,
  ...payload.data,
  isAuth: true,
});

export default function reducer(auth = {...authState}, {type, payload}) {
  switch (type) {
    case types.LOGIN_SUCCESS:
      return loginSuccess(auth, payload);
    case types.LOGIN:
    default:
      return auth;
  }
}
