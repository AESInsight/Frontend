import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CompanyEmployeeTable from '../../tables/CompanyEmployeeTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

// Mock the EditButton component
vi.mock('../../buttons/edit_button', () => ({
  default: vi.fn(({ onSave }) => (
    <button data-testid="edit-button" onClick={() => onSave({ position: 'New Title', salary: 60000, gender: 'Male', experience: 5 })}>
      Edit
    </button>
  ))
}));

describe('CompanyEmployeeTable', () => {
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
    renderWithProviders(<CompanyEmployeeTable data={mockData} />);
    expect(screen.getByTestId('header-id')).toHaveTextContent('ID');
    expect(screen.getByTestId('header-job')).toHaveTextContent('Job');
    expect(screen.getByTestId('header-salary')).toHaveTextContent('Sal');
    expect(screen.getByTestId('header-experience')).toHaveTextContent('Exp');
    expect(screen.getByTestId('header-gender')).toHaveTextContent('Gen');
  });

  it('renders employee data correctly', () => {
    renderWithProviders(<CompanyEmployeeTable data={mockData} />);
    const employeeIds = screen.getAllByTestId('employee-id');
    const jobTitles = screen.getAllByTestId('employee-job-title');
    const salaries = screen.getAllByTestId('employee-salary');
    const experiences = screen.getAllByTestId('employee-experience');
    const genders = screen.getAllByTestId('employee-gender');
    expect(employeeIds[0]).toHaveTextContent('1');
    expect(jobTitles[0]).toHaveTextContent('Developer');
    expect(salaries[0]).toHaveTextContent('50000 kr.');
    expect(experiences[0]).toHaveTextContent('5 yrs');
    expect(genders[0]).toHaveTextContent('Male');
  });

  it('shows edit button when editable is true', () => {
    renderWithProviders(<CompanyEmployeeTable data={mockData} editable={true} />);
    const editButtons = screen.getAllByTestId('edit-button');
    expect(editButtons.length).toBe(2); // One for each employee
  });

  it('does not show edit button when editable is false', () => {
    renderWithProviders(<CompanyEmployeeTable data={mockData} editable={false} />);
    const editButtons = screen.queryAllByTestId('edit-button');
    expect(editButtons.length).toBe(0);
  });

  it('calls onSave when edit button is clicked', async () => {
    renderWithProviders(
      <CompanyEmployeeTable 
        data={mockData} 
        editable={true} 
        onSave={mockOnSave}
      />
    );
    const editButton = screen.getAllByTestId('edit-button')[0];
    fireEvent.click(editButton);
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(0, {
        jobTitle: 'New Title',
        salary: 60000,
        gender: 'Male',
        experience: 5
      });
    });
  });

  it('sorts data when column headers are clicked', async () => {
    renderWithProviders(<CompanyEmployeeTable data={mockData} />);
    const salaryHeader = screen.getByTestId('header-salary');
    
    // Initial order (sorted by id ascending)
    let salaryValues = screen.getAllByTestId('employee-salary');
    let firstSalary = parseInt(salaryValues[0].textContent?.replace(' kr.', '') || '0');
    let secondSalary = parseInt(salaryValues[1].textContent?.replace(' kr.', '') || '0');
    expect(firstSalary).toBe(50000); // First employee's salary
    expect(secondSalary).toBe(45000); // Second employee's salary

    // Click once for salary ascending
    fireEvent.click(salaryHeader);
    await waitFor(() => {
      salaryValues = screen.getAllByTestId('employee-salary');
      firstSalary = parseInt(salaryValues[1].textContent?.replace(' kr.', '') || '0');
      secondSalary = parseInt(salaryValues[0].textContent?.replace(' kr.', '') || '0');
      expect(firstSalary).toBe(45000); // Lower salary first
      expect(secondSalary).toBe(50000); // Higher salary seconds
    });

    // Click again for salary descending
    fireEvent.click(salaryHeader);
    await waitFor(() => {
      salaryValues = screen.getAllByTestId('employee-salary');
      firstSalary = parseInt(salaryValues[0].textContent?.replace(' kr.', '') || '0');
      secondSalary = parseInt(salaryValues[1].textContent?.replace(' kr.', '') || '0');
      expect(firstSalary).toBe(50000); // Higher salary first
      expect(secondSalary).toBe(45000); // Lower salary second
    });
  });

  it('handles empty data gracefully', () => {
    renderWithProviders(<CompanyEmployeeTable data={[]} />);
    expect(screen.getByTestId('header-id')).toBeInTheDocument();
    expect(screen.getByTestId('header-job')).toBeInTheDocument();
    const employeeRows = screen.queryAllByTestId('employee-row');
    expect(employeeRows.length).toBe(0);
  });

  it('handles missing or null values gracefully', () => {
    const dataWithNulls = [
      {
        id: 1,
        jobTitle: '',
        salary: 0, // Changed from null to 0 to match interface
        gender: '',
        experience: 0, // Changed from null to 0 to match interface
        companyID: 1
      }
    ];
    renderWithProviders(<CompanyEmployeeTable data={dataWithNulls} />);
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