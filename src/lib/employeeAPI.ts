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
		const response = await axiosInstance.get(`/employee/company/${companyId}`);
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
	salary: number;
	companyId: number;
}) => {
	// Step 1: Add the employee
	const employeePayload = {
		jobTitle: employeeData.jobTitle.trim(),
		experience: Math.floor(employeeData.experience),
		gender: employeeData.gender,
		companyId: employeeData.companyId,
	};

	const employeeResponse = await apiClient.post("/employee/add", [
		employeePayload,
	]);

	// Step 2: Extract employeeID from response
	let employeeID: number;

	if (
		Array.isArray(employeeResponse.data) &&
		employeeResponse.data[0]?.employeeID
	) {
		employeeID = employeeResponse.data[0].employeeID;
	} else if (employeeResponse.data?.employeeID) {
		// Handle case where response is a single object
		employeeID = employeeResponse.data.employeeID;
	} else if (employeeResponse.data?.id) {
		// Handle case where ID field is named 'id'
		employeeID = employeeResponse.data.id;
	} else {
		// Fallback: Fetch the employee using fetchCompanyEmployees
		const companyEmployees = await fetchCompanyEmployees(
			employeeData.companyId
		);
		const matchingEmployee = companyEmployees.find(
			(emp) =>
				emp.jobTitle === employeeData.jobTitle &&
				emp.experience === Math.floor(employeeData.experience) &&
				emp.gender === employeeData.gender &&
				emp.companyID === employeeData.companyId
		);

		if (!matchingEmployee) {
			throw new Error(
				"Failed to find newly added employee in company employees list"
			);
		}

		employeeID = matchingEmployee.employeeID;
	}

	// Step 3: Add the salary using the employeeID
	const salaryPayload = {
		employeeID,
		salary: Math.floor(employeeData.salary),
		timestamp: new Date().toISOString(),
	};

	await apiClient.post("/salary/add", salaryPayload);

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
