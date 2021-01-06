import types from "constants/actionTypes";
console.log('🚀 ~ file: authActions.js ~ line 2 ~ types', types)

export const signInAction = (dispatch) =>
  payload =>
    dispatch({
      type: types.SIGN_IN,
      payload
    });