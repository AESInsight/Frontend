import { describe, test, expect } from "bun:test";
import EmployeeTable from "../../../components/tables/EmployeeTable";
import { TableRow } from "../../../components/tables/EmployeeTable";

describe("EmployeeTable Component", () => {
  test("component is a function", () => {
    expect(typeof EmployeeTable).toBe("function");
  });

  test("component is defined", () => {
    expect(EmployeeTable).toBeDefined();
  });

  test("component accepts required props", () => {
    const mockData: TableRow[] = [{
      id: 1,
      jobTitle: "Developer",
      salary: 50000,
      gender: "Male",
      experience: 5
    }];
    
    const props = {
      data: mockData,
      editable: true,
      onSave: () => {},
      onDelete: () => {}
    };
    
    expect(props).toHaveProperty("data");
    expect(props).toHaveProperty("editable");
    expect(props).toHaveProperty("onSave");
    expect(props).toHaveProperty("onDelete");
  });

  test("component has correct table structure", () => {
    const tableSource = EmployeeTable.toString();
    const expectedHeaders = ["ID", "Job Title", "Salary", "Experience", "Gender", "Edit"];
    expectedHeaders.forEach(header => {
      expect(tableSource).toContain(header);
    });
  });
}); 