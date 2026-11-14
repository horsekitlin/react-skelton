import { waitFor } from '@testing-library/react';
import store from 'store/configureStore';
import { signInAction, signOutAction } from 'actions/authActions';
import { loginResult } from 'apis/auth';

jest.mock('apis/auth');

const isFetching = () => store.getState().fetching.pendingActionTypes.length > 0;
const credentials = { phone: '0912345678', password: 'secret' };

describe('store sign in and sign out flow', () => {
  it('should be fetching until sign in succeeds, then be signed in', async () => {
    loginResult.mockResolvedValue({ data: { token: 'token-1', user: { id: 1 } } });

    store.dispatch(signInAction(credentials));

    expect(isFetching()).toBe(true);
    await waitFor(() => expect(isFetching()).toBe(false));
    expect(store.getState().auth).toMatchObject({ isAuth: true, token: 'token-1', user: { id: 1 } });
  });

  it('should stop fetching and stay signed out when sign in fails', async () => {
    loginResult.mockRejectedValue({ response: { data: { message: 'invalid password' } } });

    store.dispatch(signInAction(credentials));

    expect(isFetching()).toBe(true);
    await waitFor(() => expect(isFetching()).toBe(false));
    expect(store.getState().auth.isAuth).toBe(false);
  });

  it('should clear auth state when sign out is dispatched', async () => {
    loginResult.mockResolvedValue({ data: { token: 'token-1', user: { id: 1 } } });
    store.dispatch(signInAction(credentials));
    await waitFor(() => expect(store.getState().auth.isAuth).toBe(true));

    store.dispatch(signOutAction());

    expect(store.getState().auth).toMatchObject({ isAuth: false, token: '', user: {} });
  });
});
