import types from "constants/actionTypes";
import cloneDeep from "lodash/cloneDeep";
import initialState from "./initialState";

const getTasksSuccess = (task, payload) => ({
  ...task,
  totalCount: payload.items.count,
  rows: payload.items.rows,
});

export default function reducer(
  task = { ...cloneDeep(initialState.task) },
  { type, payload }
) {
  switch (type) {
    case types.GET_TASKS:
      return { ...cloneDeep(initialState.task) };
    case types.GET_TASKS_SUCCESS:
      return getTasksSuccess(task, payload);
    case types.GET_TASKS_ERROR:
    default:
      return task;
  }
}
