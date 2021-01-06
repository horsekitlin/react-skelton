import constants from 'flux-constants';

const syncActionTypes = [

];

const basicAsyncActionTypes = [
  'SIGN_IN',
  'SIGN_OUT',
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