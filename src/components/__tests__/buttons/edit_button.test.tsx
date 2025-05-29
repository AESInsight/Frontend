import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditButton from '../../buttons/edit_button'

describe('EditButton', () => {
  const mockProps = {
    id: 1,
    position: 'Developer',
    salary: '50000',
    gender: 'Male',
    experience: '5 years',
    companyID: 1,
    onSave: vi.fn(),
    onDelete: vi.fn()
  }

  it('renders correctly', () => {
    render(<EditButton {...mockProps} />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('opens modal when clicked', async () => {
    const user = userEvent.setup()
    render(<EditButton {...mockProps} />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    // Check if modal is opened by looking for its elements
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
}) 