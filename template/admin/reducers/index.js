import { combineReducers } from 'redux';
import auth from './authReducer';
import customization from './customizationReducer';

const appReducer = combineReducers({
  auth,
  customization,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
