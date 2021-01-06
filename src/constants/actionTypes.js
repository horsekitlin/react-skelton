import constants from 'flux-constants';

const syncActionTypes = [
  'SIGN_OUT',
];

const basicAsyncActionTypes = [
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