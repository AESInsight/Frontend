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

export const fetchJobTitles = async () => {
	try {
		const response = await apiClient.get("/employee/getAllJobTitles");
		if (!response || !response.data) {
			throw new Error("Invalid response from the server.");
		}
		return response.data;
	} catch (error) {
		console.error("Error fetching job titles:", error);
		throw error;
	}
};

export const updateEmployee = async (
	id: number,
	employeeData: {
		jobTitle: string;
		experience: number;
		gender: string;
		companyID: number;
		salary: number;
	}
) => {
	try {
		// Update Employee Details
		const employeePayload = {
			employeeID: id,
			jobTitle: employeeData.jobTitle,
			experience: employeeData.experience,
			gender: employeeData.gender,
			companyID: employeeData.companyID,
		};

		await apiClient.put(`/employee/update/${id}`, employeePayload);

		// Update Salary
		const salaryPayload = {
			employeeID: id,
			salary: employeeData.salary,
			timestamp: new Date().toISOString(), // Always set to the current time
		};

		await apiClient.post("/salary/add", salaryPayload);

		return { message: "Employee and salary updated successfully." };
	} catch (error) {
		console.error("Error updating employee and salary:", error);
		throw error;
	}
};

export const deleteEmployee = async (id: number) => {
	try {
		const response = await apiClient.delete(`/employee/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting employee:", error);
		throw error;
	}
};

export default apiClient;
