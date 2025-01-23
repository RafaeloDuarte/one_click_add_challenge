import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import LoginPage from '../../pages/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { AuthProvider } from '../../context/AuthContext';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Para os testes, basta retornar a chave
    i18n: { changeLanguage: vi.fn() },
  }),
}));

describe('LoginPage', () => {
  const renderComponent = () =>
    render(
      <AuthProvider>
        <Provider store={store}>
          <BrowserRouter>
            <ToastContainer />
            <LoginPage />
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    );

  it('should render login form elements', () => {
    renderComponent();

    expect(screen.getByLabelText(/login.email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/login.password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login.submit_button/i })).toBeInTheDocument();
    expect(screen.getByText(/login.no_account/i)).toBeInTheDocument();
  });

  it('should show validation errors on empty submit', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /login.submit_button/i }));

    await waitFor(() => {
      expect(screen.getByText(/login.validation.email.required/i)).toBeInTheDocument();
      expect(screen.getByText(/login.validation.password.required/i)).toBeInTheDocument();
    });
  });

  it('should show validation error for invalid email', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/login.email/i), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: /login.submit_button/i }));

    await waitFor(() => {
      expect(screen.getByText(/login.validation.email.not_valid/i)).toBeInTheDocument();
    });
  });

  it('should submit the form with valid data', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/login.email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/login.password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login.submit_button/i }));

    await waitFor(() => {
      expect(screen.queryByText(/login.validation.email.required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/login.validation.password.required/i)).not.toBeInTheDocument();
    });
  });
});