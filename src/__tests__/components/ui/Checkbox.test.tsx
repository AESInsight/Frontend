import { describe, expect, test } from "bun:test";
import { Checkbox } from "../../../components/ui/checkbox";

describe("Checkbox Component", () => {
  test("component has correct display name", () => {
    expect(Checkbox.displayName).toBe("Checkbox");
  });

  test("component is a valid React component", () => {
    expect(Checkbox).toBeDefined();
    expect(typeof Checkbox).toBe("object");
    expect(Checkbox.$$typeof).toBeDefined();
  });
}); 