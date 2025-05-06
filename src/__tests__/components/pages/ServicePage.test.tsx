import { describe, expect, test } from "bun:test";
import ServicePage from "../../../components/pages/servicepage";

describe("ServicePage Component", () => {
  test("component is a function", () => {
    expect(typeof ServicePage).toBe("function");
  });

  test("component is defined", () => {
    expect(ServicePage).toBeDefined();
  });

  test("component has basic structure", () => {
    const servicePageSource = ServicePage.toString();
    expect(servicePageSource).toContain("Header");
    expect(servicePageSource).toContain("Sidebar");
    expect(servicePageSource).toContain("Service 1");
  });
}); 