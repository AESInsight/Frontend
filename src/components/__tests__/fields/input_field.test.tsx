import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import InputField from '../../fields/input_field'

describe('InputField', () => {
  it('renders with label', () => {
    render(
      <InputField
        label="Test Label"
        value=""
        onChange={() => {}}
      />
    )
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('renders without label', () => {
    render(
      <InputField
        value=""
        onChange={() => {}}
      />
    )
    expect(screen.queryByText('Test Label')).not.toBeInTheDocument()
  })

  it('renders with placeholder', () => {
    render(
      <InputField
        placeholder="Test Placeholder"
        value=""
        onChange={() => {}}
      />
    )
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument()
  })

  it('renders with suffix', () => {
    render(
      <InputField
        value=""
        onChange={() => {}}
        suffix="USD"
      />
    )
    expect(screen.getByText('USD')).toBeInTheDocument()
  })

  it('renders with error message', () => {
    render(
      <InputField
        value=""
        onChange={() => {}}
        error="This is an error"
      />
    )
    expect(screen.getByText('This is an error')).toBeInTheDocument()
  })

  it('handles onChange event', () => {
    const handleChange = vi.fn()
    render(
      <InputField
        value=""
        onChange={handleChange}
      />
    )
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('respects maxLength prop', () => {
    render(
      <InputField
        value=""
        onChange={() => {}}
        maxLength={5}
      />
    )
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('maxLength', '5')
  })

  it('applies custom className', () => {
    render(
      <InputField
        value=""
        onChange={() => {}}
        className="custom-class"
      />
    )
    
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('custom-class')
  })
}) 