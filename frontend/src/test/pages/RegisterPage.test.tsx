import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '../../pages/RegisterPage';
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


describe('RegisterPage', () => {
  const renderComponent = () =>
    render(
      <AuthProvider>
        <Provider store={store}>
          <BrowserRouter>
            <ToastContainer />
            <RegisterPage />
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    );

  it('should render register form elements', () => {
    renderComponent();
    expect(screen.getByLabelText(/register.username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/register.email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/register.password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register.submit/i })).toBeInTheDocument();
  });

  it('should submit the form with valid data', async () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/register.username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/register.email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/register.password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/register.password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /register.submit/i }));

    await waitFor(() => {
      expect(screen.queryByText(/register.validation.name.required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/register.validation.email.required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/register.validation.password.required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/register.validation.confirm_password.required/i)).not.toBeInTheDocument();
    });
  });
});