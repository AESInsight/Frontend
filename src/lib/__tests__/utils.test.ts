import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { cn, setCompanyId, getCompanyId, clearCompanyId } from '../utils';

describe('Utility Functions', () => {
  describe('cn (className utility)', () => {
    it('should merge class names correctly', () => {
      const result = cn('base-class', 'additional-class', { 'conditional-class': true });
      expect(result).toBe('base-class additional-class conditional-class');
    });

    it('should handle conditional classes', () => {
      const result = cn('base-class', { 'conditional-class': true, 'hidden-class': false });
      expect(result).toBe('base-class conditional-class');
    });

    it('should handle empty inputs', () => {
      const result = cn();
      expect(result).toBe('');
    });
  });

  describe('Company ID Functions', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    afterEach(() => {
      localStorage.clear();
    });

    describe('setCompanyId', () => {
      it('should set company ID in localStorage', () => {
        setCompanyId(123);
        expect(localStorage.getItem('companyId')).toBe('123');
      });

      it('should not set company ID when null is provided', () => {
        setCompanyId(null);
        expect(localStorage.getItem('companyId')).toBeNull();
      });
    });

    describe('getCompanyId', () => {
      it('should return company ID as number when it exists', () => {
        localStorage.setItem('companyId', '123');
        expect(getCompanyId()).toBe(123);
      });

      it('should return null when company ID does not exist', () => {
        expect(getCompanyId()).toBeNull();
      });

      it('should return null for invalid company ID', () => {
        localStorage.setItem('companyId', 'invalid');
        expect(getCompanyId()).toBeNull();
      });
    });

    describe('clearCompanyId', () => {
      it('should remove company ID from localStorage', () => {
        localStorage.setItem('companyId', '123');
        clearCompanyId();
        expect(localStorage.getItem('companyId')).toBeNull();
      });

      it('should not throw error when company ID does not exist', () => {
        expect(() => clearCompanyId()).not.toThrow();
      });
    });
  });
}); 