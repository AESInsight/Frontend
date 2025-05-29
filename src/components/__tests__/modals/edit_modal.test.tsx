import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EditModal from '../../../components/modals/edit_modal'
import { updateEmployee, deleteEmployee, fetchJobTitles } from '../../../lib/employeeAPI'

// Mock the API calls
vi.mock('../../../lib/employeeAPI', () => ({
  updateEmployee: vi.fn(),
  deleteEmployee: vi.fn(),
  fetchJobTitles: vi.fn()
}))

// Mock the StatusModal component
vi.mock('../../../components/modals/status_modal', () => ({
  default: ({ isOpen, onClose, message }: { 
    isOpen: boolean; 
    onClose: () => void; 
    message?: string; 
  }) => (
    isOpen ? (
      <div data-testid="status-modal">
        <button onClick={onClose}>Close</button>
        <p data-testid="status-message">{message}</p>
      </div>
    ) : null
  )
}))

describe('EditModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSave: vi.fn(),
    onDelete: vi.fn(),
    initialData: {
      id: 1,
      position: 'Software Developer',
      salary: '50000',
      gender: 'Male',
      experience: '5',
      companyID: 1
    }
  }

  beforeEach(() => {
    vi.resetAllMocks()
    vi.mocked(fetchJobTitles).mockResolvedValue({ jobTitles: ['Software Developer', 'Product Manager'] })
    // Mock window.confirm to return true by default
    window.confirm = vi.fn(() => true)
  })

  it('renders when open', () => {
    render(<EditModal {...defaultProps} />)
    expect(screen.getByText('Edit Details')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<EditModal {...defaultProps} isOpen={false} />)
    expect(screen.queryByText('Edit Details')).not.toBeInTheDocument()
  })

  it('closes when backdrop is clicked', () => {
    render(<EditModal {...defaultProps} />)
    const backdrop = screen.getByRole('dialog')
    fireEvent.click(backdrop)
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it('handles position change', async () => {
    render(<EditModal {...defaultProps} />)
    const positionSelect = screen.getByRole('button', { name: /software developer/i })
    fireEvent.click(positionSelect)
    
    await waitFor(() => {
      expect(screen.getByText('Product Manager')).toBeInTheDocument()
    })
    
    fireEvent.click(screen.getByText('Product Manager'))
    expect(positionSelect).toHaveTextContent('Product Manager')
  })

  it('handles salary change', () => {
    render(<EditModal {...defaultProps} />)
    const salaryInput = screen.getByPlaceholderText('Enter salary')
    fireEvent.change(salaryInput, { target: { value: '60000' } })
    expect(salaryInput).toHaveValue('60.000')
  })

  it('handles gender change', async () => {
    render(<EditModal {...defaultProps} />)
    const genderSelect = screen.getByRole('button', { name: /male/i })
    fireEvent.click(genderSelect)
    
    await waitFor(() => {
      expect(screen.getByText('Female')).toBeInTheDocument()
    })
    
    fireEvent.click(screen.getByText('Female'))
    expect(genderSelect).toHaveTextContent('Female')
  })

  it('handles experience change', () => {
    render(<EditModal {...defaultProps} />)
    const experienceInput = screen.getByPlaceholderText('Enter experience')
    fireEvent.change(experienceInput, { target: { value: '10' } })
    expect(experienceInput).toHaveValue('10')
  })

  it('handles save success', async () => {
    vi.mocked(updateEmployee).mockResolvedValueOnce({ message: "Employee updated successfully" })
    
    render(<EditModal {...defaultProps} />)
    const saveButton = screen.getByText('Save Changes')
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(updateEmployee).toHaveBeenCalled()
      expect(defaultProps.onSave).toHaveBeenCalled()
    })
  })

  it('handles save error', async () => {
    vi.mocked(updateEmployee).mockRejectedValueOnce(new Error('Failed to save'))
    
    render(<EditModal {...defaultProps} />)
    const saveButton = screen.getByText('Save Changes')
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(updateEmployee).toHaveBeenCalled()
      expect(screen.getByTestId('status-message')).toHaveTextContent('Failed to save changes. Please try again.')
    })
  })

  it('handles delete success', async () => {
    vi.mocked(deleteEmployee).mockResolvedValueOnce({ message: "Employee deleted successfully" })
    
    render(<EditModal {...defaultProps} />)
    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)
    
    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this employee?')
      expect(deleteEmployee).toHaveBeenCalledWith(1)
      expect(defaultProps.onDelete).toHaveBeenCalled()
    })
  })

  it('handles delete error', async () => {
    vi.mocked(deleteEmployee).mockRejectedValueOnce(new Error('Failed to delete'))
    
    render(<EditModal {...defaultProps} />)
    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)
    
    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this employee?')
      expect(deleteEmployee).toHaveBeenCalledWith(1)
    })

    // Check for error message in status modal
    const statusModal = screen.getByTestId('status-modal')
    expect(statusModal).toBeInTheDocument()
    expect(screen.getByTestId('status-message')).toHaveTextContent('Failed to delete employee. Please try again.')
  })

  it('does not delete when confirmation is cancelled', async () => {
    // Mock window.confirm to return false
    window.confirm = vi.fn(() => false)
    
    render(<EditModal {...defaultProps} />)
    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)
    
    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this employee?')
      expect(deleteEmployee).not.toHaveBeenCalled()
      expect(defaultProps.onDelete).not.toHaveBeenCalled()
    })
  })
}) 