import { cn } from "../../lib/utils";

describe("Utility Functions", () => {
  describe("cn (className utility)", () => {
    test("combines class names correctly", () => {
      const result = cn("base-class", "additional-class");
      expect(result).toBe("base-class additional-class");
    });

    test("handles conditional classes", () => {
      const result = cn("base-class", { "conditional-class": true, "not-included": false });
      expect(result).toBe("base-class conditional-class");
    });

    test("handles multiple conditional classes", () => {
      const result = cn(
        "base-class",
        { "true-class": true, "false-class": false },
        { "another-true": true }
      );
      expect(result).toBe("base-class true-class another-true");
    });

    test("handles empty inputs", () => {
      const result = cn();
      expect(result).toBe("");
    });
  });
});