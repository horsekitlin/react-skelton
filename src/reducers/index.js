import { combineReducers } from 'redux';
import nav from './navReducer';
import auth from './authReducer';
import setting from './settingReducer';
import snackbar from './snackbarReducer';

const reducer = combineReducers({
  nav,
  auth,
  setting,
  snackbar
});

export default reducer;
