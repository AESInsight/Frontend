import axios from "axios";
import API_BASE_URL from "../config";

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Fetch all industries
export const fetchIndustries = async (): Promise<string[]> => {
	try {
		const response = await apiClient.get("/company/getAllIndustries");
		return response.data.filter((industry: string) => industry.trim() !== ""); // Clean empty strings
	} catch (error) {
		console.error("Error fetching industries:", error);
		throw error;
	}
};

// Fetch average salaries for jobs in a given industry
export const fetchAverageSalariesForIndustry = async (industry: string) => {
	try {
		const response = await apiClient.get(
			`/company/getAverageSalaryForJobsIn${industry}`
		);
		return response.data;
	} catch (error) {
		console.error(
			`Error fetching average salaries for industry '${industry}':`,
			error
		);
		throw error;
	}
};

export default apiClient;
