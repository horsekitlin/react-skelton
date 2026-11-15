import store from 'store/configureStore';
import { customizationSetMenuAction } from 'actions/customizationActions';
import customizationReducer from '../customizationReducer';
import initialState from '../initialState';

describe('customization menu toggle', () => {
  it('should keep the sidebar collapsed by default', () => {
    expect(initialState.customization.opened).toBe(false);
  });

  it('should toggle opened when reducer receives the set menu action', () => {
    const state = customizationReducer(initialState.customization, customizationSetMenuAction());

    expect(state.opened).toBe(!initialState.customization.opened);
  });

  it('should toggle opened in the store when the set menu action is dispatched', () => {
    const before = store.getState().customization.opened;

    store.dispatch(customizationSetMenuAction());

    expect(store.getState().customization.opened).toBe(!before);
  });
});
