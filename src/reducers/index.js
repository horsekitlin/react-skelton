import { combineReducers } from 'redux';
import auth from './authReducer';
import setting from './settingReducer';

const appReducer = combineReducers({
  auth,
  setting,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
