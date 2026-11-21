import types from 'constants/actionTypes';
import { getServer } from './index';

export const setupInterceptors = (dispatch) => {
  const server = getServer();

  server.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        dispatch({ type: types.SIGN_OUT });
      }
      return Promise.reject(error);
    },
  );
};
