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

export default axiosInstance;
