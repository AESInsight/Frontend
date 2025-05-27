import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import InsightPage from '../../../components/pages/insightpage'
import { useIsDesktop } from '../../../lib/context/desktop_context'
import { useAuth } from '../../../lib/context/auth_context'
import { fetchEmployees, fetchAllSalaries, Employee } from '../../../lib/employeeAPI'

// Mock the desktop context
vi.mock('../../../lib/context/desktop_context', () => ({
  useIsDesktop: vi.fn()
}))

// Mock the auth context
vi.mock('../../../lib/context/auth_context', () => ({
  useAuth: vi.fn()
}))

// Mock the employee API
vi.mock('../../../lib/employeeAPI', () => ({
  fetchEmployees: vi.fn(),
  fetchAllSalaries: vi.fn()
}))

// Mock the EmployeeTable component
vi.mock('../../../components/tables/EmployeeTable', () => ({
  default: ({ data }: { data: Employee[] }) => (
    <div data-testid="employee-table">
      {data.map(employee => (
        <div key={employee.employeeID} data-testid="employee-row">
          {employee.jobTitle} - {employee.salary}
        </div>
      ))}
    </div>
  )
}))

// Create a wrapper component that provides the auth context, router, and query client
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('InsightPage', () => {
  const mockEmployees = [
    {
      employeeID: 1,
      jobTitle: 'Developer',
      experience: 5,
      gender: 'Male',
      companyID: 1,
      salary: 50000
    },
    {
      employeeID: 2,
      jobTitle: 'Designer',
      experience: 3,
      gender: 'Female',
      companyID: 1,
      salary: 45000
    }
  ]

  const mockSalaries = [
    {
      employeeID: 1,
      salary: 50000,
      timestamp: '2024-01-01'
    },
    {
      employeeID: 2,
      salary: 45000,
      timestamp: '2024-01-01'
    }
  ]

  beforeEach(() => {
    // Mock auth context
    vi.mocked(useAuth).mockReturnValue({
      login: vi.fn(),
      isAuthenticated: false,
      token: null,
      logout: vi.fn()
    })

    // Reset all mocks
    vi.clearAllMocks()
  })

  it('renders the insight page content', async () => {
    // Mock desktop context to true
    vi.mocked(useIsDesktop).mockReturnValue(true)
    
    // Mock API responses
    vi.mocked(fetchEmployees).mockResolvedValue(mockEmployees)
    vi.mocked(fetchAllSalaries).mockResolvedValue(mockSalaries)
    
    render(<InsightPage />, { wrapper: TestWrapper })
    
    // Check for main heading
    expect(screen.getByText('Employee Insights')).toBeInTheDocument()
    
    // Wait for search input
    expect(await screen.findByPlaceholderText('Search employee data...')).toBeInTheDocument()
    
    // Check for footer
    expect(screen.getByText('2025 AES-Insight. All rights reserved.')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    vi.mocked(useIsDesktop).mockReturnValue(true)
    vi.mocked(fetchEmployees).mockImplementation(() => new Promise(() => {}))
    
    render(<InsightPage />, { wrapper: TestWrapper })
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows error state', async () => {
    vi.mocked(useIsDesktop).mockReturnValue(true)
    vi.mocked(fetchEmployees).mockRejectedValue(new Error('Failed to fetch'))
    
    render(<InsightPage />, { wrapper: TestWrapper })
    
    expect(await screen.findByText('Error fetching employees.')).toBeInTheDocument()
  })

  it('filters employees based on search term', async () => {
    vi.mocked(useIsDesktop).mockReturnValue(true)
    vi.mocked(fetchEmployees).mockResolvedValue(mockEmployees)
    vi.mocked(fetchAllSalaries).mockResolvedValue(mockSalaries)
    
    render(<InsightPage />, { wrapper: TestWrapper })
    
    const searchInput = await screen.findByPlaceholderText('Search employee data...')
    fireEvent.change(searchInput, { target: { value: 'Developer' } })
    
    // Wait for the filtered results
    const employeeRows = await screen.findAllByTestId('employee-row')
    expect(employeeRows).toHaveLength(1)
    expect(employeeRows[0]).toHaveTextContent('Developer')
  })

  it('renders without sidebar on mobile', () => {
    vi.mocked(useIsDesktop).mockReturnValue(false)
    vi.mocked(fetchEmployees).mockResolvedValue(mockEmployees)
    vi.mocked(fetchAllSalaries).mockResolvedValue(mockSalaries)
    
    render(<InsightPage />, { wrapper: TestWrapper })
    
    expect(screen.getByText('Employee Insights')).toBeInTheDocument()
  })
}) 