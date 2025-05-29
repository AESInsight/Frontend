import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PasswordField from '../../fields/password_field'

describe('PasswordField', () => {
  it('renders with default props', () => {
    render(
      <PasswordField
        value=""
        onChange={() => {}}
      />
    )
    
    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
  })

  it('renders with custom label', () => {
    render(<PasswordField label="Custom Label" value="" onChange={() => {}} />)
    expect(screen.getByText('Custom Label')).toBeInTheDocument()
  })

  it('renders with default placeholder', () => {
    render(<PasswordField value="" onChange={() => {}} />)
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
  })

  it('renders with custom placeholder', () => {
    render(<PasswordField placeholder="Custom placeholder" value="" onChange={() => {}} />)
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument()
  })

  it('handles onChange event', () => {
    const handleChange = vi.fn()
    render(<PasswordField value="" onChange={handleChange} />)
    
    const input = screen.getByPlaceholderText('Enter your password')
    fireEvent.change(input, { target: { value: 'test' } })
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('toggles password visibility', () => {
    render(
      <PasswordField
        value="Test123!"
        onChange={() => {}}
      />
    )
    
    const input = screen.getByPlaceholderText('Enter your password')
    expect(input).toHaveAttribute('type', 'password')
    
    const toggleButton = screen.getAllByRole('button')[1] // The second button is the visibility toggle
    fireEvent.click(toggleButton)
    
    expect(input).toHaveAttribute('type', 'text')
  })

  it('shows validation requirements on hover', () => {
    render(
      <PasswordField
        value="Test123!"
        onChange={() => {}}
      />
    )
    
    const infoButton = screen.getAllByRole('button')[0] // The first button is the info button
    fireEvent.mouseEnter(infoButton)
    
    expect(screen.getByText('Password Requirements:')).toBeInTheDocument()
    expect(screen.getByText('Minimum 8 characters long')).toBeInTheDocument()
    expect(screen.getByText('At least one uppercase letter')).toBeInTheDocument()
    expect(screen.getByText('At least one number')).toBeInTheDocument()
    expect(screen.getByText('At least one special character')).toBeInTheDocument()
  })

  it('validates password requirements correctly', () => {
    render(
      <PasswordField
        value="Test123!"
        onChange={() => {}}
        showValidation={true}
      />
    )
    
    const infoButton = screen.getAllByRole('button')[0] // The first button is the info button
    fireEvent.mouseEnter(infoButton)
  })

  it('applies custom className', () => {
    render(
      <PasswordField
        value=""
        onChange={() => {}}
        className="custom-class"
      />
    )
    
    const input = screen.getByPlaceholderText('Enter your password')
    expect(input).toHaveClass('custom-class')
  })

  it('hides info icon when showInfoIcon is false', () => {
    render(
      <PasswordField
        value=""
        onChange={() => {}}
        showInfoIcon={false}
      />
    )
    
    // Look for the info button specifically by its icon
    const infoButton = screen.queryByRole('img', { hidden: true, name: 'circle-exclamation' })
    expect(infoButton).not.toBeInTheDocument()
  })
}) 