import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthResponse, LoginCredentials } from '../types/user';
import { CompanyDetails, UserDetails, ApiResponse } from '../types/api';

const API_URL = import.meta.env.WEB_API_URL || 'http://localhost:5170/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add auth token to requests
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Handle API errors
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // Only redirect if not on the login page
            if (!window.location.pathname.includes('login')) {
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    logout: async (): Promise<void> => {
        await api.post('/auth/logout');
        localStorage.removeItem('token');
    }
};

export const companyApi = {
    getCompanyDetails: async (companyId: number): Promise<ApiResponse<CompanyDetails>> => {
        try {
            const response = await api.get<ApiResponse<CompanyDetails>>(`/companies/${companyId}`);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    data: {} as CompanyDetails,
                    success: false,
                    error: {
                        message: error.response?.data?.message || 'Failed to fetch company details',
                        statusCode: error.response?.status || 500
                    }
                };
            }
            throw error;
        }
    },

    // Add other company-related endpoints
};

export const userApi = {
    getUserDetails: async (userId: number): Promise<ApiResponse<UserDetails>> => {
        try {
            const response = await api.get<ApiResponse<UserDetails>>(`/users/${userId}`);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    data: {} as UserDetails,
                    success: false,
                    error: {
                        message: error.response?.data?.message || 'Failed to fetch user details',
                        statusCode: error.response?.status || 500
                    }
                };
            }
            throw error;
        }
    },

    // Add other user-related endpoints
};

export default api; 