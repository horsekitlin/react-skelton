import constants from 'flux-constants';

const syncActionTypes = [

];

const basicAsyncActionTypes = [
  'LOGIN',
  'LOGOUT',
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