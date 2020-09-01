import { authState } from "./initialState";
import types from "../constants/actionTypes";
import { fromJS } from "immutable";

export const loginSuccess = (auth, payload) =>
  auth.merge(
    fromJS({
      isAuth: true,
      loginErrorMsg: "",
      ...payload,
    })
  );

const loginError = (auth, payload) =>
  auth.merge({ isAuth: false, loginErrorMsg: payload.message });

const logoutSuccess = auth =>
  auth.merge(fromJS({ isAuth: false, info: {}, token: "", loginErrorMsg: "" }));

const getPermissionSuccess = (auth, payload) =>
  auth.merge(fromJS({ isAuth: true, permissions: payload }));

const getPermissionError = (auth, payload) =>
  auth.merge(fromJS({ isAuth: false, info: {}, permissions: {} }));

const initialWebAppSuccess = auth => auth.update("isInitial", () => true);

export default function reducer(auth = authState, { type, payload }) {
  switch (type) {
    case types.INITIAL_WEB_APP_SUCCESS:
      return initialWebAppSuccess(auth);
    case types.LOGOUT_SUCCESS:
      return logoutSuccess(auth);
    case types.LOGIN_SUCCESS:
      return loginSuccess(auth, payload);
    case types.GET_PERMISSION_SUCCESS:
      return getPermissionSuccess(auth, payload);
    case types.LOGIN_ERROR:
      return loginError(auth, payload);
    case types.GET_PERMISSION_ERROR:
      return getPermissionError(auth);
    case types.LOGOUT:
      // 暫時先這樣做 等待後端check token api.
      return logoutSuccess(auth);
    case types.LOGOUT_ERROR:
    case types.LOGIN:
    case types.INITIAL_WEB_APP_ERROR: //應該要導到維護頁面
    case types.INITIAL_WEB_APP:
    default:
      return auth;
  }
}
