import types from "constants/actionTypes";
import initialState from "./initialState";

const startFetching = (fetching, actionType) => {
  if (fetching.pendingActionTypes.includes(actionType)) return fetching;

  return {
    ...fetching,
    pendingActionTypes: [...fetching.pendingActionTypes, actionType],
  };
};

const stopFetching = (fetching, actionType) => ({
  ...fetching,
  pendingActionTypes: fetching.pendingActionTypes.filter(
    (pendingType) => pendingType !== actionType
  ),
});

export default function reducer(
  fetching = { ...initialState.fetching },
  { type, payload }
) {
  switch (type) {
    case types.START_FETCHING:
      return startFetching(fetching, payload);
    case types.STOP_FETCHING:
      return stopFetching(fetching, payload);
    default:
      return fetching;
  }
}
