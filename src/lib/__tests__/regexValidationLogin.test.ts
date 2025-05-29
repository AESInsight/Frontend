import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  EMAIL_REGEX,
  validatePassword,
  PASSWORD_REQUIREMENTS,
  getPasswordStrength,
} from '../regexValidationLogin';

describe('Validation Utilities', () => {
  describe('EMAIL_REGEX', () => {
    it('should be a RegExp instance', () => {
      expect(EMAIL_REGEX).toBeInstanceOf(RegExp);
    });
  });

  describe('PASSWORD_REQUIREMENTS', () => {
    it('should have correct minLength', () => {
      expect(PASSWORD_REQUIREMENTS.minLength).toBe(8);
    });

    it('should have correct regex patterns', () => {
      expect(PASSWORD_REQUIREMENTS.hasUpperCase).toBeInstanceOf(RegExp);
      expect(PASSWORD_REQUIREMENTS.hasNumber).toBeInstanceOf(RegExp);
      expect(PASSWORD_REQUIREMENTS.hasSpecialChar).toBeInstanceOf(RegExp);
    });
  });

  describe('validateEmail', () => {
    it('should return true for valid email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'first_last@sub.domain.org',
        'test+123@gmail.com',
      ];

      validEmails.forEach((email) => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it('should return false for invalid email formats', () => {
      const invalidEmails = [
        'invalid.email', // Missing @
        'user@domain', // Missing top-level domain
        '@domain.com', // Missing local part
        'user@.com', // Missing domain
        'user space@domain.com', // Spaces
        'user@domain,com', // Invalid character
      ];

      invalidEmails.forEach((email) => {
        expect(validateEmail(email)).toBe(false);
      });
    });

    it('should return false for empty or non-string inputs', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail(null as unknown as string)).toBe(false);
      expect(validateEmail(undefined as unknown as string)).toBe(false);
      expect(validateEmail(123 as unknown as string)).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should return valid result for a strong password', () => {
      const result = validatePassword('Ab1!efgh');
      expect(result).toEqual({
        isValid: true,
        errors: [],
      });
    });

    it('should detect missing minimum length', () => {
      const result = validatePassword('Ab1!ef');
      expect(result).toEqual({
        isValid: false,
        errors: ['Password must be at least 8 characters long'],
      });
    });

    it('should detect missing uppercase letter', () => {
      const result = validatePassword('ab1!efgh');
      expect(result).toEqual({
        isValid: false,
        errors: ['Password must contain at least one uppercase letter'],
      });
    });

    it('should detect missing number', () => {
      const result = validatePassword('Ab!efghi');
      expect(result).toEqual({
        isValid: false,
        errors: ['Password must contain at least one number'],
      });
    });

    it('should detect missing special character', () => {
      const result = validatePassword('Ab1efghi');
      expect(result).toEqual({
        isValid: false,
        errors: ['Password must contain at least one special character'],
      });
    });

    it('should detect multiple validation errors', () => {
      const result = validatePassword('abc');
      expect(result).toEqual({
        isValid: false,
        errors: [
          'Password must be at least 8 characters long',
          'Password must contain at least one uppercase letter',
          'Password must contain at least one number',
          'Password must contain at least one special character',
        ],
      });
    });

    it('should handle empty or non-string inputs', () => {
      const expectedResult = {
        isValid: false,
        errors: [
          'Password must be a non-empty string',
          'Password must be at least 8 characters long',
          'Password must contain at least one uppercase letter',
          'Password must contain at least one number',
          'Password must contain at least one special character',
        ],
      };

      expect(validatePassword('')).toEqual(expectedResult);
      expect(validatePassword(null as unknown as string)).toEqual(expectedResult);
      expect(validatePassword(undefined as unknown as string)).toEqual(expectedResult);
    });
  });

  describe('getPasswordStrength', () => {
    it('should return "strong" for a valid password', () => {
      expect(getPasswordStrength('Ab1!efgh')).toBe('strong');
    });

    it('should return "medium" for a password with 1-2 errors', () => {
      expect(getPasswordStrength('ab1!efgh')).toBe('medium'); // Missing uppercase
      expect(getPasswordStrength('Ab!efghi')).toBe('medium'); // Missing number
      expect(getPasswordStrength('ab1efghi')).toBe('medium'); // Missing uppercase and special char
    });

    it('should return "weak" for a password with 3 or more errors', () => {
      expect(getPasswordStrength('abc')).toBe('weak');
      expect(getPasswordStrength('abcdef')).toBe('weak');
    });

    it('should return "weak" for empty or non-string inputs', () => {
      expect(getPasswordStrength('')).toBe('weak');
      expect(getPasswordStrength(null as unknown as string)).toBe('weak');
      expect(getPasswordStrength(undefined as unknown as string)).toBe('weak');
    });
  });
});