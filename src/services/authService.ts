import { jwtDecode } from "jwt-decode";
import { authApi } from './api';
import { LoginCredentials, AuthResponse } from '../types/user';

class AuthService {
    private static TOKEN_KEY = 'token';

    static async login(credentials: LoginCredentials): Promise<AuthResponse | null> {
        try { 
            const response = await authApi.login(credentials);
            localStorage.setItem(this.TOKEN_KEY, response.token);
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            return null;
        }
    }

    static logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        // Only call logout API if you need to invalidate the token on the server
        // authApi.logout().catch(console.error);
    }

    static isAuthenticated(): boolean {
        const token = localStorage.getItem(this.TOKEN_KEY);
        if (!token) return false;

        try {
            const decoded: any = jwtDecode(token);
            return decoded.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    }

    static getRole(): 'Company' | 'User' | null {
        const token = localStorage.getItem(this.TOKEN_KEY);
        if (!token) return null;

        try {
            const decoded: any = jwtDecode(token);
            return decoded.role;
        } catch {
            return null;
        }
    }

    static getCurrentUser(): AuthResponse['user'] | null {
        const token = localStorage.getItem(this.TOKEN_KEY);
        if (!token) return null;

        try {
            const decoded: any = jwtDecode(token);
            return {
                id: decoded.nameid,
                email: decoded.email,
                role: decoded.role
            };
        } catch {
            return null;
        }
    }
}

export default AuthService; 