import { describe, expect, test } from "bun:test";
import InsightPage from "../../../components/pages/insightpage";

describe("InsightPage Component", () => {
  test("component is a function", () => {
    expect(typeof InsightPage).toBe("function");
  });

  test("component is defined", () => {
    expect(InsightPage).toBeDefined();
  });

  test("component has basic structure", () => {
    const insightPageSource = InsightPage.toString();
    expect(insightPageSource).toContain("Header");
    expect(insightPageSource).toContain("Sidebar");
    expect(insightPageSource).toContain("Employee Insights");
    expect(insightPageSource).toContain("EmployeeTable");
  });
}); 