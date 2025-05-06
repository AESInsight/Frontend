import { describe, expect, test } from "bun:test";
import AboutPage from "../../../components/pages/aboutpage";

describe("AboutPage Component", () => {
  test("component is a function", () => {
    expect(typeof AboutPage).toBe("function");
  });

  test("component is defined", () => {
    expect(AboutPage).toBeDefined();
  });

  test("component has required sections", () => {
    const aboutPageSource = AboutPage.toString();
    const expectedSections = [
      "About Us",
      "Welcome to our website! We are a deticated team of students",
      "Our mission is to deliver a high-quality product",
      "Thank you for visiting our site"
    ];
    expectedSections.forEach(section => {
      expect(aboutPageSource).toContain(section);
    });
  });

  test("component imports required components", () => {
    const aboutPageSource = AboutPage.toString();
    const requiredComponents = [
      "Header",
      "Sidebar"
    ];
    requiredComponents.forEach(component => {
      expect(aboutPageSource).toContain(component);
    });
  });
}); 