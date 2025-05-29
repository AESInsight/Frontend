import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AddEmployeeModal from '../../modals/add_employee_modal'
import { addEmployee, fetchJobTitles } from '@/lib/employeeAPI'
import { getCompanyId } from '@/lib/utils'

// Mock the API calls
vi.mock('@/lib/employeeAPI', () => ({
  addEmployee: vi.fn(),
  fetchJobTitles: vi.fn()
}))

// Mock the utils
vi.mock('@/lib/utils', () => ({
  getCompanyId: vi.fn()
}))

// Mock the StatusModal component
vi.mock('../../modals/status_modal', () => ({
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

describe('AddEmployeeModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onEmployeeAdded: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(fetchJobTitles).mockResolvedValue({ jobTitles: ['Software Developer', 'Product Manager'] })
    vi.mocked(getCompanyId).mockReturnValue(1)
  })

  it('renders when isOpen is true', () => {
    render(<AddEmployeeModal {...defaultProps} />)
    expect(screen.getByRole('heading', { name: 'Add Employee' })).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(<AddEmployeeModal {...defaultProps} isOpen={false} />)
    expect(screen.queryByRole('heading', { name: 'Add Employee' })).not.toBeInTheDocument()
  })

  it('closes when clicking the close button', () => {
    render(<AddEmployeeModal {...defaultProps} />)
    
    const closeButton = screen.getByText('Cancel')
    fireEvent.click(closeButton)
    
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it('closes when clicking the backdrop', () => {
    render(<AddEmployeeModal {...defaultProps} />)
    
    const backdrop = screen.getByRole('dialog')
    fireEvent.click(backdrop)
    
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it('handles position change', async () => {
    render(<AddEmployeeModal {...defaultProps} />)
    
    const positionSelect = screen.getByRole('button', { name: /select a job title/i })
    fireEvent.click(positionSelect)
    
    await waitFor(() => {
      const option = screen.getByText('Product Manager')
      fireEvent.click(option)
    })
    
    expect(screen.getByText('Product Manager')).toBeInTheDocument()
  })

  it('handles salary change', () => {
    render(<AddEmployeeModal {...defaultProps} />)
    
    const salaryInput = screen.getByPlaceholderText('Enter salary')
    fireEvent.change(salaryInput, { target: { value: '60000' } })
    
    expect(salaryInput).toHaveValue('60000')
  })

  it('handles gender change', async () => {
    render(<AddEmployeeModal {...defaultProps} />)
    
    const genderSelect = screen.getByRole('button', { name: /select gender/i })
    fireEvent.click(genderSelect)
    
    await waitFor(() => {
      const option = screen.getByText('Female')
      fireEvent.click(option)
    })
    
    expect(screen.getByText('Female')).toBeInTheDocument()
  })

  it('handles experience change', () => {
    render(<AddEmployeeModal {...defaultProps} />)
    
    const experienceInput = screen.getByPlaceholderText('Enter experience')
    fireEvent.change(experienceInput, { target: { value: '5' } })
    
    expect(experienceInput).toHaveValue('5')
  })

  it('handles successful employee addition', async () => {
    vi.mocked(addEmployee).mockResolvedValueOnce({ message: "Employee and salary added successfully." })
    
    render(<AddEmployeeModal {...defaultProps} />)
    
    // Fill in the form
    const positionSelect = screen.getByRole('button', { name: /select a job title/i })
    const salaryInput = screen.getByPlaceholderText('Enter salary')
    const genderSelect = screen.getByRole('button', { name: /select gender/i })
    const experienceInput = screen.getByPlaceholderText('Enter experience')
    
    fireEvent.click(positionSelect)
    await waitFor(() => {
      const option = screen.getByText('Software Developer')
      fireEvent.click(option)
    })
    
    fireEvent.change(salaryInput, { target: { value: '60000' } })
    
    fireEvent.click(genderSelect)
    await waitFor(() => {
      const option = screen.getByText('Male')
      fireEvent.click(option)
    })
    
    fireEvent.change(experienceInput, { target: { value: '5' } })
    
    const addButton = screen.getByRole('button', { name: 'Add Employee' })
    fireEvent.click(addButton)
    
    await waitFor(() => {
      expect(addEmployee).toHaveBeenCalledWith({
        jobTitle: 'Software Developer',
        experience: 5,
        gender: 'Male',
        salary: 60000,
        companyId: 1
      })
      expect(defaultProps.onEmployeeAdded).toHaveBeenCalled()
    })
  })

  it('handles add employee error', async () => {
    vi.mocked(addEmployee).mockRejectedValueOnce(new Error('Failed to add employee'))
    
    render(<AddEmployeeModal {...defaultProps} />)
    
    // Fill in the form
    const positionSelect = screen.getByRole('button', { name: /select a job title/i })
    const salaryInput = screen.getByPlaceholderText('Enter salary')
    const genderSelect = screen.getByRole('button', { name: /select gender/i })
    const experienceInput = screen.getByPlaceholderText('Enter experience')
    
    fireEvent.click(positionSelect)
    await waitFor(() => {
      const option = screen.getByText('Software Developer')
      fireEvent.click(option)
    })
    
    fireEvent.change(salaryInput, { target: { value: '60000' } })
    
    fireEvent.click(genderSelect)
    await waitFor(() => {
      const option = screen.getByText('Male')
      fireEvent.click(option)
    })
    
    fireEvent.change(experienceInput, { target: { value: '5' } })
    
    const addButton = screen.getByRole('button', { name: 'Add Employee' })
    fireEvent.click(addButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('status-modal')).toBeInTheDocument()
      expect(screen.getByTestId('status-message')).toHaveTextContent('Failed to add employee')
    })
  })

  it('validates required fields', async () => {
    render(<AddEmployeeModal {...defaultProps} />)
    
    const addButton = screen.getByRole('button', { name: 'Add Employee' })
    fireEvent.click(addButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('status-modal')).toBeInTheDocument()
      expect(screen.getByTestId('status-message')).toHaveTextContent('Please select a job title')
    })
  })

  it('validates positive numbers for salary and experience', async () => {
    render(<AddEmployeeModal {...defaultProps} />)
    
    // Fill in the form with invalid values
    const positionSelect = screen.getByRole('button', { name: /select a job title/i })
    const salaryInput = screen.getByPlaceholderText('Enter salary')
    const genderSelect = screen.getByRole('button', { name: /select gender/i })
    const experienceInput = screen.getByPlaceholderText('Enter experience')
    
    fireEvent.click(positionSelect)
    await waitFor(() => {
      const option = screen.getByText('Software Developer')
      fireEvent.click(option)
    })
    
    fireEvent.change(salaryInput, { target: { value: '0' } })
    
    fireEvent.click(genderSelect)
    await waitFor(() => {
      const option = screen.getByText('Male')
      fireEvent.click(option)
    })
    
    fireEvent.change(experienceInput, { target: { value: '0' } })
    
    const addButton = screen.getByRole('button', { name: 'Add Employee' })
    fireEvent.click(addButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('status-modal')).toBeInTheDocument()
      expect(screen.getByTestId('status-message')).toHaveTextContent('Experience must be a positive number')
    })

    // Now test salary validation
    fireEvent.change(experienceInput, { target: { value: '5' } })
    fireEvent.click(addButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('status-modal')).toBeInTheDocument()
      expect(screen.getByTestId('status-message')).toHaveTextContent('Salary must be a positive number')
    })
  })
}) 