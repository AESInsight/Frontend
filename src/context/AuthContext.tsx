import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/authService';
import { LoginCredentials, AuthResponse } from '../types/user';

interface AuthContextType {
    isAuthenticated: boolean;
    user: {
        id: number;
        email: string;
        role: 'Company' | 'User';
    } | null;
    login: (credentials: LoginCredentials) => Promise<AuthResponse | null>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<AuthContextType['user']>(null);

    useEffect(() => {
        const authenticated = AuthService.isAuthenticated();
        setIsAuthenticated(authenticated);
        if (authenticated) {
            setUser(AuthService.getCurrentUser());
        }
    }, []);

    const login = async (credentials: LoginCredentials) => {
        const result = await AuthService.login(credentials);
        if (result) {
            setIsAuthenticated(true);
            setUser(result.user);
        }
        return result;
    };

    const logout = () => {
        AuthService.logout();
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 