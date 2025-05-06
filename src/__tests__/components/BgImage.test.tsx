import { describe, expect, test } from "bun:test";
import BgImage from "../../components/bg_image";

describe("BgImage Component", () => {
  test("component has correct default props type", () => {
    // Test that BgImage is a function (functional component)
    expect(typeof BgImage).toBe("function");
  });

  test("component accepts className prop", () => {
    // Test that the component can be called with className prop
    const result = BgImage({ className: "test-class" });
    expect(result).toBeDefined();
  });
}); 