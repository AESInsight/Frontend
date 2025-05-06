import { describe, expect, test } from "bun:test";
import DefaultComponent from "../../../components/pages/fallbackpage";

describe("FallbackPage Component", () => {
  test("component is a function", () => {
    expect(typeof DefaultComponent).toBe("function");
  });

  test("component is defined", () => {
    expect(DefaultComponent).toBeDefined();
  });

  test("component has basic structure", () => {
    const fallbackPageSource = DefaultComponent.toString();
    expect(fallbackPageSource).toContain("Welcome to AESInsight");
    expect(fallbackPageSource).toContain("The Webside is under construction");
  });
}); 