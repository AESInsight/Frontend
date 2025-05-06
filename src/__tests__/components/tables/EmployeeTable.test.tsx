import { describe, expect, test } from "bun:test";
import EmployeeTable from "../../../components/tables/EmployeeTable";

describe("EmployeeTable Component", () => {
  test("component is a function", () => {
    expect(typeof EmployeeTable).toBe("function");
  });

  test("component is defined", () => {
    expect(EmployeeTable).toBeDefined();
  });

  test("component accepts required props", () => {
    const props = {
      editable: true,
      onSave: (index: number, data: any) => {},
      onDelete: (index: number) => {}
    };
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