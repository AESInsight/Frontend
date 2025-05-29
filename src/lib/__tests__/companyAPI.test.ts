import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http } from 'msw';
import apiClient, { fetchIndustries, fetchAverageSalariesForIndustry } from '../companyAPI';

// Mock the config module
vi.mock('../config', () => ({
  API_BASE_URL: 'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api',
}));

// Setup MSW server
const server = setupServer();

describe('Industry API Client', () => {
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

  describe('fetchIndustries', () => {
    it('should fetch industries successfully and filter empty strings', async () => {
      const mockIndustries = ['Tech', '', 'Finance', ' '];
      const expectedIndustries = ['Tech', 'Finance'];

      server.use(
        http.get(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/company/getAllIndustries',
          async () => {
            return new Response(JSON.stringify(mockIndustries));
          }
        )
      );

      const result = await fetchIndustries();
      expect(result).toEqual(expectedIndustries);
    });

    it('should handle empty industries array', async () => {
      server.use(
        http.get(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/company/getAllIndustries',
          async () => {
            return new Response(JSON.stringify([]));
          }
        )
      );

      const result = await fetchIndustries();
      expect(result).toEqual([]);
    });

    it('should handle fetch industries error', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error');

      server.use(
        http.get(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/company/getAllIndustries',
          async () => {
            return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
          }
        )
      );

      await expect(fetchIndustries()).rejects.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching industries:',
        expect.any(Error)
      );
    });
  });

  describe('fetchAverageSalariesForIndustry', () => {
    it('should fetch average salaries for an industry successfully', async () => {
      const industry = 'Tech';
      const mockSalaries = [
        { jobTitle: 'Developer', averageSalary: 75000 },
        { jobTitle: 'Manager', averageSalary: 90000 },
      ];

      server.use(
        http.get(
          `https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/company/getAverageSalaryForJobsIn${industry}`,
          async () => {
            return new Response(JSON.stringify(mockSalaries));
          }
        )
      );

      const result = await fetchAverageSalariesForIndustry(industry);
      expect(result).toEqual(mockSalaries);
    });

    it('should handle fetch average salaries error', async () => {
      const industry = 'Tech';
      const consoleErrorSpy = vi.spyOn(console, 'error');

      server.use(
        http.get(
          `https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/company/getAverageSalaryForJobsIn${industry}`,
          async () => {
            return new Response(JSON.stringify({ error: 'Industry not found' }), { status: 404 });
          }
        )
      );

      await expect(fetchAverageSalariesForIndustry(industry)).rejects.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Error fetching average salaries for industry '${industry}':`,
        expect.any(Error)
      );
    });


  });
});