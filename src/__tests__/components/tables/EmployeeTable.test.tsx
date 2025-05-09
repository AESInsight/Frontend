import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmployeeTable from "../../../components/tables/EmployeeTable";
import { TableRow } from "../../../components/tables/EmployeeTable";

describe("EmployeeTable Component", () => {
  const mockData: TableRow[] = [{
    id: 1,
    jobTitle: "Developer",
    salary: 50000,
    gender: "Male",
    experience: 5
  }];

  const mockProps = {
    data: mockData,
    editable: true,
    onSave: jest.fn(),
    onDelete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders table headers", () => {
    render(<EmployeeTable {...mockProps} />);
    
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Job Title")).toBeInTheDocument();
    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  test("renders employee data", () => {
    render(<EmployeeTable {...mockProps} />);
    
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(screen.getByText("50000")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("calls onSave when edit button is clicked", () => {
    render(<EmployeeTable {...mockProps} />);
    
    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(mockProps.onSave).toHaveBeenCalled();
  });

  test("calls onDelete when delete button is clicked", () => {
    render(<EmployeeTable {...mockProps} />);
    
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(mockProps.onDelete).toHaveBeenCalled();
  });
});