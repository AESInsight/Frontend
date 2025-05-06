import { describe, expect, test } from "bun:test";
import Homepage from "../../../components/pages/homepage";

describe("Homepage Component", () => {
  test("component is a function", () => {
    expect(typeof Homepage).toBe("function");
  });

  test("component is defined", () => {
    expect(Homepage).toBeDefined();
  });

  test("component has required sections", () => {
    const homepageSource = Homepage.toString();
    const expectedSections = [
      "Welcome to AES-Insight",
      "Your trusted partner in data security and insights",
      "2025 AES-Insight. All rights reserved"
    ];
    expectedSections.forEach(section => {
      expect(homepageSource).toContain(section);
    });
  });

  test("component imports required components", () => {
    const homepageSource = Homepage.toString();
    const requiredComponents = [
      "Header",
      "Sidebar",
      "ChartProvider",
      "GroupedCharts"
    ];
    requiredComponents.forEach(component => {
      expect(homepageSource).toContain(component);
    });
  });
}); 