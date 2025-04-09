import { combineReducers } from 'redux';
import auth from './authReducer';
import customization from './customizationReducer';
import task from './taskReducer';
import auth from './authReducer';

const appReducer = combineReducers({
  task,
  auth,
  customization,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
