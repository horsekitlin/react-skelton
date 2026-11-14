import constants from 'flux-constants';

const syncActionTypes = [
  'CUSTOMIZATION_SET_MENU',
  'CUSTOMIZATION_MENU_TOGGLE',
  'CUSTOMIZATION_MENU_OPEN',
  'CUSTOMIZATION_SET_FONT_FAMILY',
  'CUSTOMIZATION_SET_BORDER_RADIUS',
  'SIGN_OUT',
  'START_FETCHING',
  'STOP_FETCHING',
];

export const basicAsyncActionTypes = [
  'SIGN_IN',
  'GET_TASKS',
  'CREATE_TASK',
  'DELETE_TASK',
];

export const asyncActionTypes = basicAsyncActionTypes.reduce((result, actionType) => {
  return [
    ...result,
    actionType,
    `${actionType}_SUCCESS`,
    `${actionType}_ERROR`
  ];
}, []);

export default constants([...asyncActionTypes, ...syncActionTypes]);