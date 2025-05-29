import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmployeeTable from '../../tables/EmployeeTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

// Mock the EditButton component
vi.mock('../../buttons/edit_button', () => ({
  default: vi.fn(({ onSave }) => (
    <button data-testid="edit-button" onClick={() => onSave({ jobTitle: 'New Title', salary: 60000, gender: 'Male', experience: 5 })}>
      Edit
    </button>
  ))
}));

describe('EmployeeTable', () => {
  const mockData = [
    {
      id: 1,
      jobTitle: 'Developer',
      salary: 50000,
      gender: 'Male',
      experience: 5,
      companyID: 1
    },
    {
      id: 2,
      jobTitle: 'Designer',
      salary: 45000,
      gender: 'Female',
      experience: 3,
      companyID: 1
    }
  ];

  const mockOnSave = vi.fn();

  const renderWithProviders = (component: React.ReactNode) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders table with correct headers', () => {
    renderWithProviders(<EmployeeTable data={mockData} />);
    
    expect(screen.getByTestId('header-id')).toHaveTextContent('ID');
    expect(screen.getByTestId('header-job')).toHaveTextContent('Job');
    expect(screen.getByTestId('header-salary')).toHaveTextContent('Sal');
    expect(screen.getByTestId('header-experience')).toHaveTextContent('Exp');
    expect(screen.getByTestId('header-gender')).toHaveTextContent('Gen');
  });

  it('renders employee data correctly', () => {
    renderWithProviders(<EmployeeTable data={mockData} />);
    
    const employeeIds = screen.getAllByTestId('employee-id');
    const jobTitles = screen.getAllByTestId('employee-job-title');
    const salaries = screen.getAllByTestId('employee-salary');
    const experiences = screen.getAllByTestId('employee-experience');
    const genders = screen.getAllByTestId('employee-gender');

    expect(employeeIds[0]).toHaveTextContent('1');
    expect(jobTitles[0]).toHaveTextContent('Developer');
    expect(salaries[0]).toHaveTextContent('50000 kr');
    expect(experiences[0]).toHaveTextContent('5y');
    expect(genders[0]).toHaveTextContent('Male');
  });

  it('shows edit button when editable is true', () => {
    renderWithProviders(<EmployeeTable data={mockData} editable={true} />);
    const editButtons = screen.getAllByTestId('edit-button');
    expect(editButtons.length).toBe(2); // One for each employee
  });

  it('does not show edit button when editable is false', () => {
    renderWithProviders(<EmployeeTable data={mockData} editable={false} />);
    const editButtons = screen.queryAllByTestId('edit-button');
    expect(editButtons.length).toBe(0);
  });

  it('calls onSave when edit button is clicked', async () => {
    renderWithProviders(
      <EmployeeTable 
        data={mockData} 
        editable={true} 
        onSave={mockOnSave}
      />
    );

    const editButton = screen.getAllByTestId('edit-button')[0];
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(0, {
        id: 1,
        jobTitle: 'New Title',
        salary: 60000,
        gender: 'Male',
        experience: 5,
        companyID: 1
      });
    });
  });

  it('sorts data when column headers are clicked', async () => {
    renderWithProviders(<EmployeeTable data={mockData} />);
    
    // Click on the salary column header
    const salaryHeader = screen.getByTestId('header-salary');
    fireEvent.click(salaryHeader);

    // Get all salary values
    const salaryValues = screen.getAllByTestId('employee-salary');
    
    // Check if the values are sorted in ascending order
    const firstSalary = parseInt(salaryValues[0].textContent?.replace(' kr', '') || '0');
    const secondSalary = parseInt(salaryValues[1].textContent?.replace(' kr', '') || '0');
    expect(firstSalary).toBeLessThanOrEqual(secondSalary);

    // Click again to sort in descending order
    fireEvent.click(salaryHeader);
    
    await waitFor(() => {
      const salaryValuesDesc = screen.getAllByTestId('employee-salary');
      const firstSalaryDesc = parseInt(salaryValuesDesc[0].textContent?.replace(' kr', '') || '0');
      const secondSalaryDesc = parseInt(salaryValuesDesc[1].textContent?.replace(' kr', '') || '0');
      expect(firstSalaryDesc).toBeGreaterThanOrEqual(secondSalaryDesc);
    });
  });

  it('filters data based on search text', () => {
    renderWithProviders(<EmployeeTable data={mockData} searchText="Developer" />);
    
    const rows = screen.getAllByTestId('employee-row');
    expect(rows[0]).toHaveTextContent('Developer');
    expect(rows[0]).not.toHaveTextContent('Designer');
  });

  it('handles empty data gracefully', () => {
    renderWithProviders(<EmployeeTable data={[]} />);
    
    // Table headers should still be present
    expect(screen.getByTestId('header-id')).toBeInTheDocument();
    expect(screen.getByTestId('header-job')).toBeInTheDocument();
    
    // No employee rows should be present
    const employeeRows = screen.queryAllByTestId('employee-row');
    expect(employeeRows.length).toBe(0);
  });

  it('handles missing or null values gracefully', () => {
    const dataWithNulls = [
      {
        id: 1,
        jobTitle: '',
        salary: 0,
        gender: '',
        experience: 0,
        companyID: 1
      }
    ];
    renderWithProviders(<EmployeeTable data={dataWithNulls} />);
    const jobTitles = screen.getAllByTestId('employee-job-title');
    const salaries = screen.getAllByTestId('employee-salary');
    const experiences = screen.getAllByTestId('employee-experience');
    const genders = screen.getAllByTestId('employee-gender');
    expect(jobTitles[0]).toHaveTextContent('N/A');
    expect(salaries[0]).toHaveTextContent('N/A');
    expect(experiences[0]).toHaveTextContent('N/A');
    expect(genders[0]).toHaveTextContent('N/A');
  });
});