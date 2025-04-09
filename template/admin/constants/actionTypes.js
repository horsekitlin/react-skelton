import constants from 'flux-constants';

const syncActionTypes = [
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