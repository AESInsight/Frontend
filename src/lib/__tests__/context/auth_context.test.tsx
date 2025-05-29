import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../context/auth_context';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Mock react-router-dom hooks
const mockNavigate = vi.fn();
const mockUseLocation = vi.fn().mockReturnValue({
  pathname: '/',
  state: null,
  key: '',
  search: '',
  hash: ''
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockUseLocation(),
  };
});

// Test component that uses the auth context
const TestComponent = () => {
  const auth = useAuth();
  return (
    <div>
      <div data-testid="is-authenticated">{auth.isAuthenticated.toString()}</div>
      <div data-testid="token">{auth.token || 'no-token'}</div>
      <button onClick={() => auth.login('test-token')}>Login</button>
      <button onClick={() => auth.logout()}>Logout</button>
    </div>
  );
};

const renderWithAuth = (component: React.ReactNode, initialPath = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AuthProvider>
        <Routes>
          <Route path="*" element={component} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset mocks
    vi.clearAllMocks();
    // Reset default location
    mockUseLocation.mockReturnValue({
      pathname: '/',
      state: null,
      key: '',
      search: '',
      hash: ''
    });
  });

  it('provides initial unauthenticated state', () => {
    renderWithAuth(<TestComponent />);
    
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('token')).toHaveTextContent('no-token');
  });

  it('loads token from localStorage on mount', () => {
    localStorage.setItem('authToken', 'stored-token');
    renderWithAuth(<TestComponent />);
    
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    expect(screen.getByTestId('token')).toHaveTextContent('stored-token');
  });

  it('handles login correctly', () => {
    renderWithAuth(<TestComponent />);
    
    act(() => {
      screen.getByText('Login').click();
    });

    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    expect(screen.getByTestId('token')).toHaveTextContent('test-token');
    expect(localStorage.getItem('authToken')).toBe('test-token');
  });

  it('handles logout correctly', () => {
    localStorage.setItem('authToken', 'test-token');
    renderWithAuth(<TestComponent />);
    
    act(() => {
      screen.getByText('Logout').click();
    });

    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('token')).toHaveTextContent('no-token');
    expect(localStorage.getItem('authToken')).toBeNull();
    expect(localStorage.getItem('companyId')).toBeNull();
  });

  it('navigates to home when logging out from admin page', () => {
    // Set the location to /admin before rendering
    mockUseLocation.mockReturnValue({
      pathname: '/admin',
      state: null,
      key: '',
      search: '',
      hash: ''
    });
    
    localStorage.setItem('authToken', 'test-token');
    renderWithAuth(<TestComponent />);
    
    act(() => {
      screen.getByText('Logout').click();
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('throws error when useAuth is used outside AuthProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuth must be used within an AuthProvider');
    
    consoleError.mockRestore();
  });
}); 