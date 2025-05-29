import { describe, it, expect } from 'vitest';
import type {
  MonthlyEntry,
  SalaryEntry,
  ChartDataEntry,
  JobSalaryData,
  SalaryRaiseData,
  EmployeeData
} from '../../types/salary';

describe('Salary Types', () => {
  describe('MonthlyEntry', () => {
    it('should validate correct MonthlyEntry data', () => {
      const validEntry: MonthlyEntry = {
        month: '2024-01',
        Men: 50000,
        Women: 48000,
        MenCount: 10,
        WomenCount: 8
      };

      expect(validEntry).toHaveProperty('month');
      expect(validEntry).toHaveProperty('Men');
      expect(validEntry).toHaveProperty('Women');
      expect(validEntry).toHaveProperty('MenCount');
      expect(validEntry).toHaveProperty('WomenCount');
      expect(typeof validEntry.month).toBe('string');
      expect(typeof validEntry.Men).toBe('number');
      expect(typeof validEntry.Women).toBe('number');
      expect(typeof validEntry.MenCount).toBe('number');
      expect(typeof validEntry.WomenCount).toBe('number');
    });
  });

  describe('SalaryEntry', () => {
    it('should validate correct SalaryEntry data', () => {
      const validEntry: SalaryEntry = {
        salaryID: 1,
        employeeID: 123,
        salary: 45000,
        timestamp: '2024-01-15T10:30:00Z'
      };

      expect(validEntry).toHaveProperty('salaryID');
      expect(validEntry).toHaveProperty('employeeID');
      expect(validEntry).toHaveProperty('salary');
      expect(validEntry).toHaveProperty('timestamp');
      expect(typeof validEntry.salaryID).toBe('number');
      expect(typeof validEntry.employeeID).toBe('number');
      expect(typeof validEntry.salary).toBe('number');
      expect(typeof validEntry.timestamp).toBe('string');
    });
  });

  describe('ChartDataEntry', () => {
    it('should validate correct ChartDataEntry data', () => {
      const validEntry: ChartDataEntry = {
        position: 'Software Engineer',
        people: 15,
        fill: '#FF5733',
        value: 75000,
        percentage: '25%'
      };

      expect(validEntry).toHaveProperty('position');
      expect(validEntry).toHaveProperty('people');
      expect(validEntry).toHaveProperty('fill');
      expect(typeof validEntry.position).toBe('string');
      expect(typeof validEntry.people).toBe('number');
      expect(typeof validEntry.fill).toBe('string');
      expect(typeof validEntry.value).toBe('number');
      expect(typeof validEntry.percentage).toBe('string');
    });

    it('should allow optional value and percentage properties', () => {
      const validEntry: ChartDataEntry = {
        position: 'Software Engineer',
        people: 15,
        fill: '#FF5733'
      };

      expect(validEntry).toHaveProperty('position');
      expect(validEntry).toHaveProperty('people');
      expect(validEntry).toHaveProperty('fill');
      expect(validEntry).not.toHaveProperty('value');
      expect(validEntry).not.toHaveProperty('percentage');
    });
  });

  describe('JobSalaryData', () => {
    it('should validate correct JobSalaryData', () => {
      const validData: JobSalaryData = {
        jobTitle: 'Software Engineer',
        genderData: {
          'Male': {
            averageSalary: 55000,
            employeeCount: 10
          },
          'Female': {
            averageSalary: 52000,
            employeeCount: 8
          }
        }
      };

      expect(validData).toHaveProperty('jobTitle');
      expect(validData).toHaveProperty('genderData');
      expect(typeof validData.jobTitle).toBe('string');
      expect(typeof validData.genderData).toBe('object');
      expect(validData.genderData['Male']).toHaveProperty('averageSalary');
      expect(validData.genderData['Male']).toHaveProperty('employeeCount');
      expect(typeof validData.genderData['Male'].averageSalary).toBe('number');
      expect(typeof validData.genderData['Male'].employeeCount).toBe('number');
    });
  });

  describe('SalaryRaiseData', () => {
    it('should validate correct SalaryRaiseData', () => {
      const validData: SalaryRaiseData = {
        employeeID: 123,
        gender: 'Male',
        jobTitle: 'Software Engineer'
      };

      expect(validData).toHaveProperty('employeeID');
      expect(validData).toHaveProperty('gender');
      expect(validData).toHaveProperty('jobTitle');
      expect(typeof validData.employeeID).toBe('number');
      expect(typeof validData.gender).toBe('string');
      expect(typeof validData.jobTitle).toBe('string');
    });
  });

  describe('EmployeeData', () => {
    it('should validate correct EmployeeData', () => {
      const validData: EmployeeData = {
        employeeID: 123,
        gender: 'Female',
        jobTitle: 'Product Manager'
      };

      expect(validData).toHaveProperty('employeeID');
      expect(validData).toHaveProperty('gender');
      expect(validData).toHaveProperty('jobTitle');
      expect(typeof validData.employeeID).toBe('number');
      expect(typeof validData.gender).toBe('string');
      expect(typeof validData.jobTitle).toBe('string');
    });
  });
}); 