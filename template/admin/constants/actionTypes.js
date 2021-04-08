import constants from 'flux-constants';

export const syncActionTypes = [
  'START_FETCHING',
  'STOP_FETCHING',
  'SIGN_OUT',
];

export const basicAsyncActionTypes = [
  'SIGN_IN',  
];


const asyncActionTypes = basicAsyncActionTypes.reduce((result, actionType) => {
  return [
    ...result,
    actionType,
    `${actionType}_SUCCESS`,
    `${actionType}_ERROR`
  ];
}, []);

export default constants([...asyncActionTypes, ...syncActionTypes]);