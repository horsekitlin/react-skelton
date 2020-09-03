import { settingState } from './initialState';
import types from '~/constants/actionTypes';

export default function reducer(setting = settingState, { type, payload }) {
  switch (type) {
    case types.START_FETCHING:
      return setting.update('fetchingTypes', currentValue =>
        currentValue.add(payload)
      );
    case types.STOP_FETCHING:
      return setting.update('fetchingTypes', currentValue =>
        currentValue.delete(payload)
      );
    default:
      return setting;
  }
}
