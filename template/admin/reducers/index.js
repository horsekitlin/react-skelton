import { combineReducers } from 'redux';
import customization from './customizationReducer';

const appReducer = combineReducers({
  customization,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
