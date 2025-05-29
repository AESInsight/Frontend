import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http } from 'msw';
import axiosInstance, { postLogin, postReset, postResetPassword } from '../loginAPI';
import apiClient from '../companyAPI';

// Mock the config module
vi.mock('../config', () => ({
  API_BASE_URL: 'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api',
}));

// Setup MSW server
const server = setupServer();

describe('API Client', () => {
  beforeEach(() => {
    server.listen({ onUnhandledRequest: 'error' }); // Fail on unhandled requests
    localStorage.clear();
  });

  afterEach(() => {
    server.resetHandlers();
    vi.clearAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  describe('axiosInstance configuration', () => {
    it('should have correct baseURL', () => {
      expect(axiosInstance.defaults.baseURL).toBe(
        'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api'
      );
    });

    it('should add Authorization header when token exists', async () => {
      const token = 'test-token';
      localStorage.setItem('authToken', token);

      server.use(
        http.get(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/test',
          async ({ request }) => {
            expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`);
            return new Response(JSON.stringify({ success: true }));
          }
        )
      );

      await axiosInstance.get('/test').catch((error) => {
        throw new Error(`Failed to make request: ${error.message}`);
      });
    });

    it('should not add Authorization header when no token exists', async () => {
      server.use(
        http.get(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/test',
          async ({ request }) => {
            expect(request.headers.get('Authorization')).toBeNull();
            return new Response(JSON.stringify({ success: true }));
          }
        )
      );

      await axiosInstance.get('/test').catch((error) => {
        throw new Error(`Failed to make request: ${error.message}`);
      });
    });
  });

  describe('postLogin', () => {
    it('should successfully login and return token and companyID', async () => {
      const mockResponse = {
        token: 'jwt-token',
        companyID: 123,
      };

      server.use(
        http.post(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/Auth/login',
          async () => {
            return new Response(JSON.stringify(mockResponse));
          }
        )
      );

      const consoleLogSpy = vi.spyOn(console, 'log');
      const result = await postLogin('test@example.com', 'password123').catch((error) => {
        throw new Error(`Login request failed: ${error.message}`);
      });

      expect(result).toEqual(mockResponse);
      expect(consoleLogSpy).toHaveBeenCalledWith('Login request:', { email: 'test@example.com' });
      expect(consoleLogSpy).toHaveBeenCalledWith('Login response data:', mockResponse);
    });

    it('should handle login error', async () => {
      server.use(
        http.post(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/Auth/login',
          async () => {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
          }
        )
      );

      const consoleErrorSpy = vi.spyOn(console, 'error');
      await expect(postLogin('wrong@example.com', 'wrong')).rejects.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('postReset', () => {
    it('should successfully request password reset', async () => {
      const mockResponse = { message: 'Reset link sent' };

      server.use(
        http.post(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/PasswordReset/request-reset',
          async ({ request }) => {
            const body = await request.json();
            expect(body).toEqual({ email: 'test@example.com' });
            return new Response(JSON.stringify(mockResponse));
          }
        )
      );

      const result = await postReset('test@example.com').catch((error) => {
        throw new Error(`Reset request failed: ${error.message}`);
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle password reset request error', async () => {
      server.use(
        http.post(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/PasswordReset/request-reset',
          async () => {
            return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
          }
        )
      );

      await expect(postReset('invalid@example.com')).rejects.toThrow();
    });
  });

  describe('postResetPassword', () => {
    it('should successfully reset password', async () => {
      const mockResponse = { message: 'Password reset successful' };

      server.use(
        http.post(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/PasswordReset/reset',
          async ({ request }) => {
            const body = await request.json();
            expect(body).toEqual({
              token: 'reset-token',
              newPassword: 'newPass123',
              confirmPassword: 'newPass123',
            });
            return new Response(JSON.stringify(mockResponse));
          }
        )
      );

      const result = await postResetPassword('reset-token', 'newPass123', 'newPass123').catch(
        (error) => {
          throw new Error(`Reset password request failed: ${error.message}`);
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle password reset error', async () => {
      server.use(
        http.post(
          'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api/PasswordReset/reset',
          async () => {
            return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 400 });
          }
        )
      );

      await expect(
        postResetPassword('invalid-token', 'newPass123', 'newPass123')
      ).rejects.toThrow();
    });
  });

  describe('apiClient configuration', () => {
    it('should have correct headers', () => {
      // Use apiClient instead of axiosInstance, as apiClient sets the Content-Type header
      expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
    });

    it('should have correct baseURL', () => {
      expect(axiosInstance.defaults.baseURL).toBe(
        'https://aes-backend-geaefagrhudkesg9.northeurope-01.azurewebsites.net/api'
      );
    });
  });
});