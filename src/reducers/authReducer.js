import initialState from './initialState';

export default function routeReducer(auth = initialState.auth, { type, payload }) {
  switch (type) {
    default:
      return auth;
  }
}
