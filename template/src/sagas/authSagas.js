import types from "constants/actionTypes";
import { signinResult } from "apis/auth";
import fetchAPIResult from "utils/sagaHelper";

export function* signinSaga({ payload }) {
  return yield fetchAPIResult({
    apiResult: signinResult,
    payload,
    actionType: types.SIGNIN,
  });
}
