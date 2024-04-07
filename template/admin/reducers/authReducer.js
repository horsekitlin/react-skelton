import types from "constants/actionTypes";
import initialState from "./initialState";

const loginSuccess = (auth, payload) => ({
  ...auth,
  ...payload
});

export default function reducer(
  auth = { ...initialState.auth },
  { type, payload }
) {
  switch (type) {
    case types.SIGN_IN_SUCCESS:
      return loginSuccess(auth, payload);
    case types.SIGN_IN:
    case types.SIGN_IN_ERROR:
    case types.SIGN_OUT:
      return { ...auth, isAuth: false, token: '', user: {} };
    default:
      return auth;
  }
}
