import types from "constants/actionTypes";
import initialState from "./initialState";

export default function routeReducer(
  customization = initialState.customization,
  { type }
) {
  switch (type) {
    case types.CUSTOMIZATION_SET_MENU:
      return {
        ...customization,
        opened: !customization.opened,
      };
    default:
      return customization;
  }
}
