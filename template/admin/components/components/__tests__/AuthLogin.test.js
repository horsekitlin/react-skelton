import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from "react-redux";
import AuthLogin from '../auth-forms/AuthLogin';
import configureStore from "store/configureStore";

const store = configureStore();

test('renders learn react link', async () => {
  const {findAllByText, getByTestId} = render(
    <Provider store={store}>
      <AuthLogin />
    </Provider>);

  fireEvent.click(getByTestId("loginButton"));
  const errorTextElements = await findAllByText("Email is required")
  expect(errorTextElements.length).toBe(1);
});
