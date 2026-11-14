import { combineReducers } from 'redux';
import auth from './authReducer';
import customization from './customizationReducer';
import task from './taskReducer';
import fetching from './fetchingReducer';

const appReducer = combineReducers({
  task,
  auth,
  fetching,
  customization,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
