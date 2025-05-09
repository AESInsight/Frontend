interface Employee {
  employeeID: number;
  jobTitle: string;
  gender: string;
  experience: number;
  companyID: number;
}

interface Salary {
  employeeID: number;
  salary: number;
  timestamp: string;
}

describe("Employee Models", () => {
  test("Employee interface has correct structure", () => {
    const employee: Employee = {
      employeeID: 100,
      jobTitle: "Software Engineer",
      gender: "Male",
      experience: 5,
      companyID: 1
    };

    expect(employee).toHaveProperty("employeeID");
    expect(employee).toHaveProperty("jobTitle");
    expect(employee).toHaveProperty("gender");
    expect(employee).toHaveProperty("experience");
    expect(employee).toHaveProperty("companyID");
  });

  test("Salary interface has correct structure", () => {
    const salary: Salary = {
      employeeID: 100,
      salary: 50000,
      timestamp: "2024-01-01T00:00:00Z"
    };

    expect(salary).toHaveProperty("employeeID");
    expect(salary).toHaveProperty("salary");
    expect(salary).toHaveProperty("timestamp");
  });

  test("Employee data has correct types", () => {
    const employee: Employee = {
      employeeID: 100,
      jobTitle: "Software Engineer",
      gender: "Male",
      experience: 5,
      companyID: 1
    };

    expect(typeof employee.employeeID).toBe("number");
    expect(typeof employee.jobTitle).toBe("string");
    expect(typeof employee.gender).toBe("string");
    expect(typeof employee.experience).toBe("number");
    expect(typeof employee.companyID).toBe("number");
  });

  test("Salary data has correct types", () => {
    const salary: Salary = {
      employeeID: 100,
      salary: 50000,
      timestamp: "2024-01-01T00:00:00Z"
    };

    expect(typeof salary.employeeID).toBe("number");
    expect(typeof salary.salary).toBe("number");
    expect(typeof salary.timestamp).toBe("string");
  });
});