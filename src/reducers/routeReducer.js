import initialState from './initialState';

export default function routeReducer(route = initialState.route, { type, payload }) {
  switch (type) {
    default:
      return route;
  }
}
