import { fromJS } from 'immutable';
import { getLoginUser } from '../store/localStorage';
import isEmpty from 'lodash/isEmpty';

const DEFAULT_USER = {
  info: {
    employeeName: '',
    roleName: '',
  },
  permissions: {
    elements: {
      read: false,
      add: false,
      update: false,
      delete: false,
    },
    settings: {
      read: false,
      add: false,
      update: false,
      delete: false,
    },
    accounts: {
      read: false,
      add: false,
      update: false,
      delete: false,
    },
    roles: {
      read: false,
      add: false,
      update: false,
      delete: false,
    },
  },
};

const user = getLoginUser();
const isAuth = !isEmpty(user);
const userData = isEmpty(user)
  ? DEFAULT_USER
  : user;

export const authState = fromJS({
  isAuth,
  isInitial: false,
  loginErrorMsg: '',
  ...userData,
});

export const settingState = fromJS({
  fetchCount: 0
});

export const snackbarState = fromJS({
  open: false,
  message: '',
  type: 'info'
});

export const navState = fromJS({
  isSideBarOpened: false,
  isAlertDialogOpen: false,
  alertMessage: '',
  level: 'info',
  watchedMenu: '',
  alertType: ''
});
