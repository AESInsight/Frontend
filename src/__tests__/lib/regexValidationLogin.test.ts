import { describe, test, expect } from "bun:test";
import { validateEmail, validatePassword, getPasswordStrength } from "../../lib/regexValidationLogin";

describe("Login Validation Functions", () => {
  describe("validateEmail", () => {
    test("accepts valid email addresses", () => {
      expect(validateEmail("test@example.com")).toBe(true);
      expect(validateEmail("user.name@domain.com")).toBe(true);
      expect(validateEmail("user-name@domain.com")).toBe(true);
      expect(validateEmail("user_name@domain.com")).toBe(true);
      expect(validateEmail("user@domain.co.uk")).toBe(true); // Multiple dots are actually allowed
    });

    test("rejects invalid email addresses", () => {
      expect(validateEmail("invalid-email")).toBe(false);
      expect(validateEmail("missing@domain")).toBe(false);
      expect(validateEmail("@missing-local.com")).toBe(false);
      expect(validateEmail("")).toBe(false);
      expect(validateEmail("user+tag@example.com")).toBe(false); // + not allowed
    });
  });

  describe("validatePassword", () => {
    test("accepts valid passwords", () => {
      const result = validatePassword("StrongP@ss123");
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test("rejects passwords that are too short", () => {
      const result = validatePassword("Short1!");
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Password must be at least 8 characters long");
    });

    test("rejects passwords without uppercase", () => {
      const result = validatePassword("lowercase123!");
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Password must contain at least one uppercase letter");
    });

    test("rejects passwords without numbers", () => {
      const result = validatePassword("NoNumbers!");
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Password must contain at least one number");
    });

    test("rejects passwords without special characters", () => {
      const result = validatePassword("NoSpecial123");
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Password must contain at least one special character");
    });
  });

  describe("getPasswordStrength", () => {
    test("returns 'strong' for valid passwords", () => {
      expect(getPasswordStrength("StrongP@ss123")).toBe("strong");
    });

    test("returns 'medium' for passwords with 1-2 issues", () => {
      expect(getPasswordStrength("StrongPass")).toBe("medium"); // Missing number and special char
      expect(getPasswordStrength("strong123")).toBe("medium"); // Missing uppercase and special char
    });

    test("returns 'weak' for passwords with 3+ issues", () => {
      expect(getPasswordStrength("weak")).toBe("weak");
      expect(getPasswordStrength("")).toBe("weak");
    });
  });
}); 