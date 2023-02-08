import { combineReducers } from 'redux';
import customization from './customizationReducer';
import auth from './authReducer';

const appReducer = combineReducers({
  auth,
  customization,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
