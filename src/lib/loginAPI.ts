import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:5170/api",
});

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("authToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default axiosInstance;
