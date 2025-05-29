import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ResetPasswordModal from '../../modals/resetpassword_modal'

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  email: '',
  onEmailChange: vi.fn(),
  onReset: vi.fn(),
  message: '',
  isError: false,
  isSending: false
}

describe('ResetPasswordModal', () => {
  it('renders when isOpen is true', () => {
    render(<ResetPasswordModal {...defaultProps} />)
    expect(screen.getByRole('heading', { name: 'Reset Password' })).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(<ResetPasswordModal {...defaultProps} isOpen={false} />)
    expect(screen.queryByRole('heading', { name: 'Reset Password' })).not.toBeInTheDocument()
  })

  it('closes when clicking the close button', () => {
    render(<ResetPasswordModal {...defaultProps} />)
    
    const closeButton = screen.getByLabelText('Close reset modal')
    fireEvent.click(closeButton)
    
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it('closes when clicking the backdrop', () => {
    render(<ResetPasswordModal {...defaultProps} />)
    
    const backdrop = screen.getByTestId('reset-modal-backdrop')
    fireEvent.click(backdrop)
    
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it('handles successful password reset', () => {
    render(<ResetPasswordModal {...defaultProps} />)
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const sendButton = screen.getByRole('button', { name: 'Send Email' })
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(sendButton)
    
    expect(defaultProps.onEmailChange).toHaveBeenCalledWith(expect.any(Object))
    expect(defaultProps.onReset).toHaveBeenCalled()
  })

  it('validates email format', () => {
    render(<ResetPasswordModal {...defaultProps} />)
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const sendButton = screen.getByRole('button', { name: 'Send Email' })
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(sendButton)
    
    expect(defaultProps.onEmailChange).toHaveBeenCalledWith(expect.any(Object))
    expect(defaultProps.onReset).toHaveBeenCalled()
  })

  it('displays error message when provided', () => {
    const errorMessage = 'Failed to send reset email'
    render(<ResetPasswordModal {...defaultProps} message={errorMessage} isError={true} />)
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('displays success message when provided', () => {
    const successMessage = 'Password reset email sent'
    render(<ResetPasswordModal {...defaultProps} message={successMessage} isError={false} />)
    
    expect(screen.getByText(successMessage)).toBeInTheDocument()
  })
}) 