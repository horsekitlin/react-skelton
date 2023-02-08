import types from "constants/actionTypes";
import initialState from "./initialState";

const loginSuccess = (auth) => ({
  ...auth,
  isAuth: true,
});

export default function reducer(auth = { ...initialState.authState }, { type, payload }) {
  switch (type) {
    case types.SIGN_IN_SUCCESS:
      return loginSuccess(auth);
    case types.SIGN_IN:
    case types.SIGN_IN_ERROR:
    default:
      return auth;
  }
}
