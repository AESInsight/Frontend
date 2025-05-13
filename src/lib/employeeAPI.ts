import axios from "axios";
import API_BASE_URL from "../config";
import axiosInstance from "./loginAPI";

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export interface Employee {
	employeeID: number;
	jobTitle: string;
	salary: number;
	experience: number;
	gender: string;
	companyID: number;
}

export const fetchEmployees = async (): Promise<Employee[]> => {
	const response = await axiosInstance.get("/employee/GetAllEmployees");
	return response.data;
};

export const fetchCompanyEmployees = async (
	companyId: number
): Promise<Employee[]> => {
	try {
		console.log("Fetching employees for company:", companyId);
		console.log("Current token:", localStorage.getItem("authToken"));

		const response = await axiosInstance.get(`/employee/company/${companyId}`);
		console.log("Response:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching company employees:", error);
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

export const addEmployee = async (employeeData: {
	jobTitle: string;
	experience: number;
	gender: string;
	companyId: number;
	salaries?: { employee: string; salary: number; timestamp: string }[];
}) => {
	// Add Employee with salaries in the payload
	const employeePayload: {
		jobTitle: string;
		experience: number;
		gender: string;
		companyId: number;
		salaries?: { employee: string; salary: number; timestamp: string }[];
	} = {
		jobTitle: employeeData.jobTitle.trim(),
		experience: Math.floor(employeeData.experience),
		gender: employeeData.gender,
		companyId: employeeData.companyId,
	};

	// Include salaries in the payload if provided
	if (employeeData.salaries && employeeData.salaries.length > 0) {
		employeePayload.salaries = employeeData.salaries.map((salaryEntry) => ({
			employee: salaryEntry.employee,
			salary: Math.floor(salaryEntry.salary),
			timestamp: salaryEntry.timestamp,
		}));
	}

	await apiClient.post("/employee/add", [employeePayload]);

	return { message: "Employee and salary added successfully." };
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
