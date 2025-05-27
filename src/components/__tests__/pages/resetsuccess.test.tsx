import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ResetSuccessPage from '../../pages/resetsuccess';
import { AuthProvider } from '../../../lib/context/auth_context';

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the auth context
vi.mock('../../../lib/context/auth_context', () => ({
  useAuth: () => ({
    token: 'test-token',
    login: vi.fn(),
    logout: vi.fn(),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('ResetSuccessPage', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <ResetSuccessPage />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders the success message', () => {
    renderComponent();
    expect(screen.getByText('Password Reset Successful')).toBeInTheDocument();
    expect(screen.getByText(/Your password has been updated/)).toBeInTheDocument();
  });

  it('renders the login button', () => {
    renderComponent();
    expect(screen.getByText('Open Login')).toBeInTheDocument();
  });

  it('opens login modal when button is clicked', () => {
    renderComponent();
    const loginButton = screen.getByText('Open Login');
    fireEvent.click(loginButton);
    // The modal should be rendered when the button is clicked
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
