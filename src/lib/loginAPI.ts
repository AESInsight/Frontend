import API_BASE_URL from "@/config";
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("authToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const postLogin = async (email: string, password: string) => {
	const response = await apiClient.post("/auth/login", {email, password});
	return response.data;
};

export const postReset = async (email: string) => {
	const response = await apiClient.post("/PasswordReset/request-reset", {email});
	return response.data;
};

export default axiosInstance;
