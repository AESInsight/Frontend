import axios from "axios";
import API_BASE_URL from "../config";

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const fetchEmployees = async () => {
	try {
		const response = await apiClient.get("/employee/GetAllEmployees");
		return response.data;
	} catch (error) {
		console.error("Error fetching employees:", error);
		throw error;
	}
};

export default apiClient;
