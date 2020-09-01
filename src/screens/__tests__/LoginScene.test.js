import React from 'react';
import LoginScene from '../LoginScreen/view';
import theme from '../../constants/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { render, fireEvent } from '@testing-library/react'
import { authState } from '../../reducers/initialState';

const MOCK_ACCOUNT = 'MOCK_ACCOUNT';
const MOCK_PASSWORD = 'MOCK_PASSWORD';

describe('LoginScene unitest', () => {
  it('should test AuthWrapper', async () => {
    const handleLogin = jest.fn();

    const { getByTestId } = render(
      <MuiThemeProvider theme={theme}>
        <LoginScene handleLogin={handleLogin} auth={authState} />
      </MuiThemeProvider>
    );
    const [accountInput, passwordInput, submitButton] = await Promise.all([
      getByTestId('account'),
      getByTestId('password'),
      getByTestId('submit'),
    ])

    await Promise.all([
      fireEvent.change(accountInput, {
        target: { value: MOCK_ACCOUNT, name: 'account' },
      }),
      fireEvent.change(passwordInput, {
        target: { value: MOCK_PASSWORD, name: 'password' },
      }),
    ])

    await fireEvent.click(submitButton);

    expect(handleLogin).toHaveBeenCalled();
  });
});
