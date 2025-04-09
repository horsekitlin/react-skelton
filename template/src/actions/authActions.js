import types from 'constants/actionTypes';

export const signInAction = (payload) => ({
  type: types.SIGN_IN,
  payload,
});

export const signOutAction = () => ({
  type: types.SIGN_OUT,
});
