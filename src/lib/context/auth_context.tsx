import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
	isAuthenticated: boolean;
	token: string | null;
	login: (token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		// Check for token in localStorage on mount
		const storedToken = localStorage.getItem("authToken");
		if (storedToken) {
			setToken(storedToken);
			setIsAuthenticated(true);
		}
	}, []);

	const login = (newToken: string) => {
		setToken(newToken);
		setIsAuthenticated(true);
		localStorage.setItem("authToken", newToken);
	};

	const logout = () => {
		setToken(null);
		setIsAuthenticated(false);
		localStorage.removeItem("authToken");
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
