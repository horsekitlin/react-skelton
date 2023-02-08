import constants from 'flux-constants';

const syncActionTypes = [
  'CUSTOMIZATION_SET_MENU',
  'CUSTOMIZATION_MENU_TOGGLE',
  'CUSTOMIZATION_MENU_OPEN',
  'CUSTOMIZATION_SET_FONT_FAMILY',
  'CUSTOMIZATION_SET_BORDER_RADIUS',
];

export const basicAsyncActionTypes = [
  'SIGN_IN',
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