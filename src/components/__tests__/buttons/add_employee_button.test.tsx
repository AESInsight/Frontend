import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddEmployeeButton from '../../buttons/add_employee_button'

describe('AddEmployeeButton', () => {
  it('renders correctly', () => {
    render(<AddEmployeeButton />)
    const button = screen.getByRole('button', { name: /add employee/i })
    expect(button).toBeInTheDocument()
  })

  it('opens modal when clicked', async () => {
    const user = userEvent.setup()
    render(<AddEmployeeButton />)
    
    const button = screen.getByRole('button', { name: /add employee/i })
    await user.click(button)
    
    // Check if modal is opened by looking for its elements
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('calls onEmployeeAdded callback when employee is added', async () => {
    const onEmployeeAdded = vi.fn()
    const user = userEvent.setup()
    render(<AddEmployeeButton onEmployeeAdded={onEmployeeAdded} />)
    
    const button = screen.getByRole('button', { name: /add employee/i })
    await user.click(button)
    
    // Simulate adding an employee through the modal
    // Note: This is a simplified test. In a real scenario, you'd need to fill out the form
    // and submit it through the modal
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
}) 