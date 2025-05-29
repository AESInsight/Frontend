import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminPage from '../../pages/adminpage';
import { AuthProvider } from '../../../lib/context/auth_context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new QueryClient for each test
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Mock the API calls
vi.mock('../../../lib/employeeAPI', () => ({
  fetchCompanyEmployees: vi.fn().mockResolvedValue([]),
  fetchAllSalaries: vi.fn().mockResolvedValue([]),
  updateEmployee: vi.fn(),
  deleteEmployee: vi.fn(),
}));

// Mock the auth context
vi.mock('../../../lib/context/auth_context', () => ({
  useAuth: () => ({
    token: 'test-token',
    login: vi.fn(),
    logout: vi.fn(),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock the desktop context
vi.mock('../../../lib/context/desktop_context', () => ({
  useIsDesktop: () => true,
}));

describe('AdminPage', () => {
  const renderComponent = () => {
    const testQueryClient = createTestQueryClient();
    return render(
      <QueryClientProvider client={testQueryClient}>
        <BrowserRouter>
          <AuthProvider>
            <AdminPage />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    // Set up localStorage mock
    localStorage.setItem('companyId', '1');
  });

  it('renders the admin page title', async () => {
    await act(async () => {
      renderComponent();
    });
    expect(screen.getByText('Admin Page')).toBeInTheDocument();
  });

  it('renders the search input', async () => {
    await act(async () => {
      renderComponent();
    });
    expect(screen.getByPlaceholderText('Search employee data...')).toBeInTheDocument();
  });

  it('renders the add employee button', async () => {
    await act(async () => {
      renderComponent();
    });
    await waitFor(() => {
      expect(screen.getByText('Add Employee')).toBeInTheDocument();
    });
  });

  it('shows no employees message when there are no employees', async () => {
    await act(async () => {
      renderComponent();
    });
    await waitFor(() => {
      expect(screen.getByTestId('no-employees-message')).toBeInTheDocument();
    });
  });

  it('updates search term when typing in search input', async () => {
    await act(async () => {
      renderComponent();
    });
    const searchInput = screen.getByPlaceholderText('Search employee data...');
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'test' } });
    });
    expect(searchInput).toHaveValue('test');
  });
});
