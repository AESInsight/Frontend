import type { MonthlyEntry, SalaryEntry, JobSalaryData, SalaryRaiseData, EmployeeData } from "../../lib/types/salary";

describe("Salary Models", () => {
  test("MonthlyEntry type has correct structure", () => {
    const monthlyEntry: MonthlyEntry = {
      month: "2024-01",
      Men: 50000,
      Women: 45000,
      MenCount: 10,
      WomenCount: 8
    };

    expect(monthlyEntry).toHaveProperty("month");
    expect(monthlyEntry).toHaveProperty("Men");
    expect(monthlyEntry).toHaveProperty("Women");
    expect(monthlyEntry).toHaveProperty("MenCount");
    expect(monthlyEntry).toHaveProperty("WomenCount");
  });

  test("SalaryEntry type has correct structure", () => {
    const salaryEntry: SalaryEntry = {
      salaryID: 1,
      employeeID: 100,
      salary: 50000,
      timestamp: "2024-01-01T00:00:00Z"
    };

    expect(salaryEntry).toHaveProperty("salaryID");
    expect(salaryEntry).toHaveProperty("employeeID");
    expect(salaryEntry).toHaveProperty("salary");
    expect(salaryEntry).toHaveProperty("timestamp");
  });

  test("JobSalaryData type has correct structure", () => {
    const jobSalaryData: JobSalaryData = {
      jobTitle: "Software Engineer",
      genderData: {
        "Male": {
          averageSalary: 55000,
          employeeCount: 15
        },
        "Female": {
          averageSalary: 52000,
          employeeCount: 10
        }
      }
    };

    expect(jobSalaryData).toHaveProperty("jobTitle");
    expect(jobSalaryData).toHaveProperty("genderData");
    expect(jobSalaryData.genderData).toHaveProperty("Male");
    expect(jobSalaryData.genderData).toHaveProperty("Female");
  });

  test("SalaryRaiseData type has correct structure", () => {
    const salaryRaiseData: SalaryRaiseData = {
      employeeID: 100,
      gender: "Male",
      jobTitle: "Software Engineer"
    };

    expect(salaryRaiseData).toHaveProperty("employeeID");
    expect(salaryRaiseData).toHaveProperty("gender");
    expect(salaryRaiseData).toHaveProperty("jobTitle");
  });

  test("EmployeeData type has correct structure", () => {
    const employeeData: EmployeeData = {
      employeeID: 100,
      gender: "Male",
      jobTitle: "Software Engineer"
    };

    expect(employeeData).toHaveProperty("employeeID");
    expect(employeeData).toHaveProperty("gender");
    expect(employeeData).toHaveProperty("jobTitle");
  });
});