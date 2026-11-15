import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AuthLogin from '../auth-forms/AuthLogin';

const submit = () => fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

describe('AuthLogin', () => {
  it('should show password required error and not sign in when password is empty', async () => {
    const handleSignIn = jest.fn();
    render(<AuthLogin handleSignIn={handleSignIn} />);

    submit();

    expect(await screen.findByText('Password is required')).toBeInTheDocument();
    expect(handleSignIn).not.toHaveBeenCalled();
  });

  it('should call handleSignIn with phone and password when form is valid', async () => {
    const handleSignIn = jest.fn();
    const { container } = render(<AuthLogin handleSignIn={handleSignIn} />);

    fireEvent.change(container.querySelector('input[name="phone"]'), { target: { value: '0912345678' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'secret' } });
    submit();

    await waitFor(() => expect(handleSignIn).toHaveBeenCalledTimes(1));
    expect(handleSignIn).toHaveBeenCalledWith(
      expect.objectContaining({ phone: '0912345678', password: 'secret' }),
    );
  });
});
