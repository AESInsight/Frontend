import { describe, expect, test } from "bun:test";
import { ChartContainer, ChartTooltip } from "../../../components/ui/chart";

describe("Chart Components", () => {
  test("ChartContainer component is defined", () => {
    expect(ChartContainer).toBeDefined();
  });

  test("ChartContainer is a function", () => {
    expect(typeof ChartContainer).toBe("function");
  });

  test("ChartTooltip component is defined", () => {
    expect(ChartTooltip).toBeDefined();
  });

  test("ChartTooltip is a function", () => {
    expect(typeof ChartTooltip).toBe("function");
  });
}); 