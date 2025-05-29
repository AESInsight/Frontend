import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LoginModal from '../../../components/modals/login_modal'
import { postLogin } from '../../../lib/loginAPI'
import { useAuth } from '../../../lib/context/auth_context'
import axios, { AxiosResponse } from 'axios'

interface LoginResponse {
  token: string;
  companyID: number;
}

// Move mock declarations to the top and use vi.fn() directly in the mock
vi.mock('../../../lib/loginAPI', () => ({
  postLogin: vi.fn()
}))

vi.mock('../../../lib/context/auth_context', () => ({
  useAuth: vi.fn()
}))

describe('LoginModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onLoginSuccess: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useAuth).mockReturnValue({
      login: vi.fn(),
      isAuthenticated: false,
      token: null,
      logout: vi.fn()
    })
  })

  it('renders login form when open', () => {
    render(<LoginModal {...defaultProps} />)
    expect(screen.getByTestId('email-input')).toBeInTheDocument()
    expect(screen.getByTestId('password-input')).toBeInTheDocument()
    expect(screen.getByTestId('login-button')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<LoginModal {...defaultProps} isOpen={false} />)
    expect(screen.queryByTestId('email-input')).not.toBeInTheDocument()
  })

  it('closes when backdrop is clicked', () => {
    render(<LoginModal {...defaultProps} />)
    fireEvent.click(screen.getByTestId('modal-backdrop'))
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it('shows error message on invalid email', async () => {
    render(<LoginModal {...defaultProps} />)
    const emailInput = screen.getByTestId('email-input')
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(screen.getByTestId('login-button'))
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
  })

  it('handles successful login', async () => {
    const mockResponse: LoginResponse = { token: 'test-token', companyID: 123 }
    vi.mocked(postLogin).mockResolvedValueOnce(mockResponse)
    
    render(<LoginModal {...defaultProps} />)
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } })
    fireEvent.click(screen.getByTestId('login-button'))
    
    await waitFor(() => {
      expect(vi.mocked(postLogin)).toHaveBeenCalledWith('test@example.com', 'password123')
      expect(defaultProps.onLoginSuccess).toHaveBeenCalledWith('test-token', 123)
    })
  })

  it('shows error message on failed login', async () => {
    const error = new axios.AxiosError(
      'Invalid credentials',
      '401',
      undefined,
      undefined,
      {
        status: 401,
        data: { message: 'Invalid credentials' }
      } as AxiosResponse
    )
    vi.mocked(postLogin).mockRejectedValueOnce(error)
    
    render(<LoginModal {...defaultProps} />)
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'wrong-password' } })
    fireEvent.click(screen.getByTestId('login-button'))
    
    await waitFor(() => {
      expect(screen.getByTestId('login-error')).toHaveTextContent('Invalid credentials')
    })
  })
}) 