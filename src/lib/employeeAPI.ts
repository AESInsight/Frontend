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

export type SalaryEntry = {
	salaryID: number;
	employeeID: number;
	salary: number;
	timestamp: string;
};

export const fetchAllSalaries = async () => {
	try {
		const response = await apiClient.get("/salary/all");
		if (!response || !response.data) {
			throw new Error("Invalid response from the server.");
		}
		return response.data;
	} catch (error) {
		console.error("Error fetching salaries:", error);
		throw error;
	}
};

export default apiClient;
