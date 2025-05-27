import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../ui/header';

// Mock the button components
vi.mock('../../buttons/header_buttons/login_button', () => ({
  default: () => <button data-testid="login-btn">Login</button>
}));
vi.mock('../../buttons/header_buttons/admin_button', () => ({
  default: () => <button data-testid="admin-btn">Admin</button>
}));
vi.mock('../../buttons/header_buttons/Insight_button', () => ({
  default: () => <button data-testid="insight-btn">Insight</button>
}));

// Mock useAuth
vi.mock('@/lib/context/auth_context', () => ({
  useAuth: vi.fn()
}));

import { useAuth } from '@/lib/context/auth_context';

const mockUseAuth = useAuth as unknown as jest.Mock;

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders logo and all buttons when authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    render(<Header />);

    // Logo
    const logo = screen.getByTestId('header-logo');
    expect(logo).toHaveAttribute('src', '/aesinsight.png');

    // Buttons
    expect(screen.getByTestId('admin-btn')).toBeInTheDocument();
    expect(screen.getByTestId('insight-btn')).toBeInTheDocument();
    expect(screen.getByTestId('login-btn')).toBeInTheDocument();
  });

  it('renders logo and only insight/login buttons when not authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });
    render(<Header />);

    // Logo
    const logo = screen.getByTestId('header-logo');
    expect(logo).toHaveAttribute('src', '/aesinsight.png');

    // Buttons
    expect(screen.queryByTestId('admin-btn')).not.toBeInTheDocument();
    expect(screen.getByTestId('insight-btn')).toBeInTheDocument();
    expect(screen.getByTestId('login-btn')).toBeInTheDocument();
  });

  it('navigates to / when logo is clicked', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    render(<Header />);
    const logo = screen.getByTestId('header-logo');
    // Mock window.location.href
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' } as any;
    fireEvent.click(logo);
    expect(window.location.href).toBe('/');
    window.location = originalLocation;
  });
}); 