import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http } from 'msw';
import apiClient, {
  Employee,
  fetchEmployees,
  fetchCompanyEmployees,
  fetchAllSalaries,
  fetchJobTitles,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from '../employeeAPI';

// Mock the config module
vi.mock('../config', () => ({
  API_BASE_URL: 'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api',
}));

// Setup MSW server
const server = setupServer();

describe('Employee API Client', () => {
  beforeEach(() => {
    server.listen({ onUnhandledRequest: 'error' }); // Fail on unhandled requests
    vi.clearAllMocks();
  });

  afterEach(() => {
    server.resetHandlers();
    vi.clearAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  describe('apiClient configuration', () => {
    it('should have correct baseURL', () => {
      expect(apiClient.defaults.baseURL).toBe(
        'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api'
      );
    });

    it('should have correct headers', () => {
      expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
    });
  });

  describe('fetchEmployees', () => {
    it('should fetch all employees successfully', async () => {
      const mockEmployees: Employee[] = [
        {
          employeeID: 1,
          jobTitle: 'Developer',
          salary: 50000,
          experience: 5,
          gender: 'Male',
          companyID: 1,
        },
      ];

      server.use(
        http.get(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/GetAllEmployees',
          async () => {
            return new Response(JSON.stringify(mockEmployees));
          }
        )
      );

      const result = await fetchEmployees();
      expect(result).toEqual(mockEmployees);
    });

    it('should handle fetch employees error', async () => {
      server.use(
        http.get(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/GetAllEmployees',
          async () => {
            return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
          }
        )
      );

      await expect(fetchEmployees()).rejects.toThrow();
    });
  });

  describe('fetchCompanyEmployees', () => {
    it('should fetch company employees successfully', async () => {
      const mockEmployees: Employee[] = [
        {
          employeeID: 2,
          jobTitle: 'Manager',
          salary: 70000,
          experience: 10,
          gender: 'Female',
          companyID: 1,
        },
      ];

      server.use(
        http.get(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/company/1',
          async () => {
            return new Response(JSON.stringify(mockEmployees));
          }
        )
      );

      const result = await fetchCompanyEmployees(1);
      expect(result).toEqual(mockEmployees);
    });

    it('should handle fetch company employees error', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error');
      server.use(
        http.get(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/company/1',
          async () => {
            return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
          }
        )
      );

      await expect(fetchCompanyEmployees(1)).rejects.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching company employees:',
        expect.any(Error)
      );
    });
  });

  describe('fetchAllSalaries', () => {
    it('should fetch all salaries successfully', async () => {
      const mockSalaries = [
        { employeeID: 1, salary: 50000, timestamp: '2025-05-28T07:00:00Z' },
      ];

      server.use(
        http.get(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/salary/all',
          async () => {
            return new Response(JSON.stringify(mockSalaries));
          }
        )
      );

      const result = await fetchAllSalaries();
      expect(result).toEqual(mockSalaries);
    });

    it('should handle invalid response error', async () => {
      server.use(
        http.get(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/salary/all',
          async () => {
            return new Response(JSON.stringify(null));
          }
        )
      );

      const consoleErrorSpy = vi.spyOn(console, 'error');
      await expect(fetchAllSalaries()).rejects.toThrow('Invalid response from the server.');
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching salaries:',
        expect.any(Error)
      );
    });

    it('should handle network error', async () => {
      server.use(
        http.get(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/salary/all',
          async () => {
            return new Response(null, { status: 500 });
          }
        )
      );

      const consoleErrorSpy = vi.spyOn(console, 'error');
      await expect(fetchAllSalaries()).rejects.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching salaries:',
        expect.any(Error)
      );
    });
  });

  describe('fetchJobTitles', () => {
    it('should fetch job titles successfully', async () => {
      const mockJobTitles = ['Developer', 'Manager'];

      server.use(
        http.get(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/getAllJobTitles',
          async () => {
            return new Response(JSON.stringify(mockJobTitles));
          }
        )
      );

      const result = await fetchJobTitles();
      expect(result).toEqual(mockJobTitles);
    });

    it('should handle invalid response error', async () => {
      server.use(
        http.get(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/getAllJobTitles',
          async () => {
            return new Response(JSON.stringify(null));
          }
        )
      );

      const consoleErrorSpy = vi.spyOn(console, 'error');
      await expect(fetchJobTitles()).rejects.toThrow('Invalid response from the server.');
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching job titles:',
        expect.any(Error)
      );
    });

    it('should handle network error', async () => {
      server.use(
        http.get(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/getAllJobTitles',
          async () => {
            return new Response(null, { status: 500 });
          }
        )
      );

      const consoleErrorSpy = vi.spyOn(console, 'error');
      await expect(fetchJobTitles()).rejects.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching job titles:',
        expect.any(Error)
      );
    });
  });

  describe('addEmployee', () => {
    it('should add employee and salary successfully with array response', async () => {
      const employeeData = {
        jobTitle: 'Developer',
        experience: 5,
        gender: 'Male',
        salary: 50000,
        companyId: 1,
      };

      server.use(
        http.post(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/add',
          async ({ request }) => {
            const body = await request.json();
            expect(body).toEqual([
              {
                jobTitle: 'Developer',
                experience: 5,
                gender: 'Male',
                companyId: 1,
              },
            ]);
            return new Response(JSON.stringify([{ employeeID: 1 }]));
          }
        ),
        http.post(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/salary/add',
          async ({ request }) => {
            const body = await request.json();
            expect(body).toEqual({
              employeeID: 1,
              salary: 50000,
              timestamp: expect.any(String),
            });
            return new Response(JSON.stringify({}));
          }
        )
      );

      const result = await addEmployee(employeeData);
      expect(result).toEqual({ message: 'Employee and salary added successfully.' });
    });

    it('should add employee and salary successfully with single object response', async () => {
      const employeeData = {
        jobTitle: 'Developer',
        experience: 5,
        gender: 'Male',
        salary: 50000,
        companyId: 1,
      };

      server.use(
        http.post(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/add',
          async () => {
            return new Response(JSON.stringify({ employeeID: 1 }));
          }
        ),
        http.post(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/salary/add',
          async () => {
            return new Response(JSON.stringify({}));
          }
        )
      );

      const result = await addEmployee(employeeData);
      expect(result).toEqual({ message: 'Employee and salary added successfully.' });
    });

    it('should add employee and salary successfully with id response', async () => {
      const employeeData = {
        jobTitle: 'Developer',
        experience: 5,
        gender: 'Male',
        salary: 50000,
        companyId: 1,
      };

      server.use(
        http.post(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/add',
          async () => {
            return new Response(JSON.stringify({ id: 1 }));
          }
        ),
        http.post(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/salary/add',
          async () => {
            return new Response(JSON.stringify({}));
          }
        )
      );

      const result = await addEmployee(employeeData);
      expect(result).toEqual({ message: 'Employee and salary added successfully.' });
    });

    it('should add employee and salary using fallback fetchCompanyEmployees', async () => {
      const employeeData = {
        jobTitle: 'Developer',
        experience: 5,
        gender: 'Male',
        salary: 50000,
        companyId: 1,
      };

      server.use(
        http.post(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/add',
          async () => {
            return new Response(JSON.stringify({}));
          }
        ),
        http.post(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/salary/add',
          async () => {
            return new Response(JSON.stringify({}));
          }
        ),
        http.get(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/company/1',
          async () => {
            return new Response(
              JSON.stringify([
                {
                  employeeID: 1,
                  jobTitle: 'Developer',
                  experience: 5,
                  gender: 'Male',
                  companyID: 1,
                  salary: 50000,
                },
              ])
            );
          }
        )
      );

      const result = await addEmployee(employeeData);
      expect(result).toEqual({ message: 'Employee and salary added successfully.' });
    });

    it('should handle add employee error', async () => {
      const employeeData = {
        jobTitle: 'Developer',
        experience: 5,
        gender: 'Male',
        salary: 50000,
        companyId: 1,
      };

      server.use(
        http.post(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/add',
          async () => {
            return new Response(JSON.stringify({ error: 'Invalid data' }), { status: 400 });
          }
        )
      );

      await expect(addEmployee(employeeData)).rejects.toThrow();
    });
  });

  describe('updateEmployee', () => {
    it('should update employee and salary successfully', async () => {
      const employeeData = {
        jobTitle: 'Senior Developer',
        experience: 7,
        gender: 'Female',
        companyID: 1,
        salary: 60000,
      };

      server.use(
        http.put(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/update/1',
          async ({ request }) => {
            const body = await request.json();
            expect(body).toEqual({
              employeeID: 1,
              jobTitle: 'Senior Developer',
              experience: 7,
              gender: 'Female',
              companyID: 1,
            });
            return new Response(JSON.stringify({}));
          }
        ),
        http.post(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/salary/add',
          async ({ request }) => {
            const body = await request.json();
            expect(body).toEqual({
              employeeID: 1,
              salary: 60000,
              timestamp: expect.any(String),
            });
            return new Response(JSON.stringify({}));
          }
        )
      );

      const result = await updateEmployee(1, employeeData);
      expect(result).toEqual({ message: 'Employee and salary updated successfully.' });
    });

    it('should handle update employee error', async () => {
      const employeeData = {
        jobTitle: 'Senior Developer',
        experience: 7,
        gender: 'Female',
        companyID: 1,
        salary: 60000,
      };

      server.use(
        http.put(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/update/1',
          async () => {
            return new Response(JSON.stringify({ error: 'Invalid data' }), { status: 400 });
          }
        )
      );

      const consoleErrorSpy = vi.spyOn(console, 'error');
      await expect(updateEmployee(1, employeeData)).rejects.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error updating employee and salary:',
        expect.any(Error)
      );
    });
  });

  describe('deleteEmployee', () => {
    it('should delete employee successfully', async () => {
      const mockResponse = { message: 'Employee deleted successfully' };

      server.use(
        http.delete(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/1',
          async () => {
            return new Response(JSON.stringify(mockResponse));
          }
        )
      );

      const result = await deleteEmployee(1);
      expect(result).toEqual(mockResponse);
    });

    it('should handle delete employee error', async () => {
      server.use(
        http.delete(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/employee/1',
          async () => {
            return new Response(JSON.stringify({ error: 'Employee not found' }), { status: 404 });
          }
        )
      );

      const consoleErrorSpy = vi.spyOn(console, 'error');
      await expect(deleteEmployee(1)).rejects.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error deleting employee:',
        expect.any(Error)
      );
    });
  });
});