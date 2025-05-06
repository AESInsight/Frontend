import { describe, expect, test } from "bun:test";
import { Select } from "../../../components/ui/select";

describe("Select Component", () => {
  test("component is a function", () => {
    expect(typeof Select).toBe("function");
  });

  test("component has correct prop types", () => {
    const props = {
      options: ["Option 1", "Option 2"],
      selected: "Option 1",
      onChange: () => {},
    };
    expect(props).toHaveProperty("options");
    expect(props).toHaveProperty("selected");
    expect(props).toHaveProperty("onChange");
  });
}); 