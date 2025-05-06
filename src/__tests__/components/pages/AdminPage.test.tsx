import { describe, expect, test } from "bun:test";
import InsightPage from "../../../components/pages/adminpage";

describe("AdminPage Component", () => {
  test("component is a function", () => {
    expect(typeof InsightPage).toBe("function");
  });

  test("component is defined", () => {
    expect(InsightPage).toBeDefined();
  });

  test("component has required sections", () => {
    const adminPageSource = InsightPage.toString();
    const expectedSections = [
      "Admin Page",
      "Search employee data...",
      "Loading...",
      "Error fetching employees",
      "No employees found"
    ];
    expectedSections.forEach(section => {
      expect(adminPageSource).toContain(section);
    });
  });

  test("component imports required components", () => {
    const adminPageSource = InsightPage.toString();
    const requiredComponents = [
      "Header",
      "Sidebar",
      "InputField",
      "EmployeeTable",
      "FontAwesomeIcon",
      "useQuery"
    ];
    requiredComponents.forEach(component => {
      expect(adminPageSource).toContain(component);
    });
  });

  test("component has required state and query", () => {
    const adminPageSource = InsightPage.toString();
    const requiredFeatures = [
      "useState",
      "searchTerm",
      "setSearchTerm",
      "useQuery",
      "isLoading",
      "isError",
      "filteredEmployees"
    ];
    requiredFeatures.forEach(feature => {
      expect(adminPageSource).toContain(feature);
    });
  });
}); 