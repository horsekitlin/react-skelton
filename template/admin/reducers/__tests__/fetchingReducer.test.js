import types from 'constants/actionTypes';
import fetchingReducer from '../fetchingReducer';
import initialState from '../initialState';

const startAction = (actionType) => ({ type: types.START_FETCHING, payload: actionType });
const stopAction = (actionType) => ({ type: types.STOP_FETCHING, payload: actionType });

describe('fetchingReducer', () => {
  it('should return the initial fetching state', () => {
    expect(fetchingReducer(undefined, { type: '@@INIT' })).toEqual(initialState.fetching);
  });

  it('should add the action type when fetching starts', () => {
    const state = fetchingReducer(initialState.fetching, startAction('GET_TASKS'));

    expect(state.pendingActionTypes).toEqual(['GET_TASKS']);
  });

  it('should not duplicate an action type that is already pending', () => {
    const started = fetchingReducer(initialState.fetching, startAction('GET_TASKS'));
    const startedAgain = fetchingReducer(started, startAction('GET_TASKS'));

    expect(startedAgain.pendingActionTypes).toEqual(['GET_TASKS']);
  });

  it('should remove only the stopped action type', () => {
    const started = [startAction('GET_TASKS'), startAction('SIGN_IN')].reduce(fetchingReducer, initialState.fetching);

    const state = fetchingReducer(started, stopAction('GET_TASKS'));

    expect(state.pendingActionTypes).toEqual(['SIGN_IN']);
  });
});
