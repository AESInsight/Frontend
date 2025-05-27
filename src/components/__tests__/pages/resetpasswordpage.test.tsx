import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter, useNavigate, useSearchParams } from 'react-router-dom'
import ResetPasswordPage from '../../../components/pages/resetpasswordpage'
import { postResetPassword } from '../../../lib/loginAPI'
import { AuthProvider } from '../../../lib/context/auth_context'

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn()
  }
})

// Mock the API call
vi.mock('../../../lib/loginAPI', () => ({
  postResetPassword: vi.fn()
}))

// Mock AuthProvider
vi.mock('../../../lib/context/auth_context', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth: () => ({
    login: vi.fn(),
    isAuthenticated: false,
    token: null,
    logout: vi.fn()
  })
}))

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </MemoryRouter>
)

describe('ResetPasswordPage', () => {
  const mockNavigate = vi.fn()
  const mockSearchParams = new URLSearchParams('?token=test-token')

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()])
  })

  it('renders the reset password form', () => {
    render(<ResetPasswordPage />, { wrapper: TestWrapper })
    
    expect(screen.getByText('Reset Your Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument()
  })

  it('shows error when passwords do not match', async () => {
    render(<ResetPasswordPage />, { wrapper: TestWrapper })
    
    const passwordInputs = screen.getAllByPlaceholderText('Enter your password')
    fireEvent.change(passwordInputs[0], { target: { value: 'Password123!' } })
    fireEvent.change(passwordInputs[1], { target: { value: 'Password456!' } })
    
    const resetButton = screen.getByRole('button', { name: /reset password/i })
    fireEvent.click(resetButton)
    
    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument()
  })

  it('shows error when password is invalid', async () => {
    render(<ResetPasswordPage />, { wrapper: TestWrapper })
    
    const passwordInputs = screen.getAllByPlaceholderText('Enter your password')
    fireEvent.change(passwordInputs[0], { target: { value: 'weak' } })
    fireEvent.change(passwordInputs[1], { target: { value: 'weak' } })
    
    const resetButton = screen.getByRole('button', { name: /reset password/i })
    fireEvent.click(resetButton)
    
    expect(screen.getByText(/Password must be at least 8 characters long/)).toBeInTheDocument()
  })

  it('handles successful password reset', async () => {
    vi.mocked(postResetPassword).mockResolvedValueOnce({ message: 'Password reset successful!' })
    
    render(<ResetPasswordPage />, { wrapper: TestWrapper })
    
    const passwordInputs = screen.getAllByPlaceholderText('Enter your password')
    fireEvent.change(passwordInputs[0], { target: { value: 'Password123!' } })
    fireEvent.change(passwordInputs[1], { target: { value: 'Password123!' } })
    
    const resetButton = screen.getByRole('button', { name: /reset password/i })
    fireEvent.click(resetButton)
    
    await waitFor(() => {
      expect(postResetPassword).toHaveBeenCalledWith('test-token', 'Password123!', 'Password123!')
      expect(mockNavigate).toHaveBeenCalledWith('/reset-success')
    })
  })

  it('handles API error', async () => {
    vi.mocked(postResetPassword).mockRejectedValueOnce(new Error('Invalid token'))
    
    render(<ResetPasswordPage />, { wrapper: TestWrapper })
    
    const passwordInputs = screen.getAllByPlaceholderText('Enter your password')
    fireEvent.change(passwordInputs[0], { target: { value: 'Password123!' } })
    fireEvent.change(passwordInputs[1], { target: { value: 'Password123!' } })
    
    const resetButton = screen.getByRole('button', { name: /reset password/i })
    fireEvent.click(resetButton)
    
    await waitFor(() => {
      expect(screen.getByText('Invalid token')).toBeInTheDocument()
    })
  })

  it('disables submit button while submitting', async () => {
    vi.mocked(postResetPassword).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    render(<ResetPasswordPage />, { wrapper: TestWrapper })
    
    const passwordInputs = screen.getAllByPlaceholderText('Enter your password')
    fireEvent.change(passwordInputs[0], { target: { value: 'Password123!' } })
    fireEvent.change(passwordInputs[1], { target: { value: 'Password123!' } })
    
    const resetButton = screen.getByRole('button', { name: /reset password/i })
    fireEvent.click(resetButton)
    
    expect(screen.getByRole('button', { name: 'Submitting...' })).toBeDisabled()
  })
}) 