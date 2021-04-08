import types from "constants/actionTypes";

export const signInAction = (dispatch) =>
  payload =>
    dispatch({
      type: types.SIGN_IN,
      payload
    });

export const signOutAction = (dispatch) =>
    payload =>
      dispatch({
        type: types.SIGN_OUT,
        payload
      });
