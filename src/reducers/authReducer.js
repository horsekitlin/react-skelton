import types from 'constants/actionTypes';
import initialState from './initialState';

export default function routeReducer(auth = initialState.auth, { type, payload }) {
  switch (type) {
    case types.SIGN_IN_SUCCESS:
      return { ...auth, isAuth: true }
    case types.SIGN_IN:
    case types.SIGN_IN_ERROR:
    default:
      return auth;
  }
}
