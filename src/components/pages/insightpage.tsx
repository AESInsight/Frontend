import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees, fetchAllSalaries } from "../../lib/employeeAPI";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import InputField from "../fields/input_field";
import EmployeeTable from "../tables/EmployeeTable";
import { useIsDesktop } from "@/lib/context/desktop_context";

// Define the Employee and Salary types
interface Employee {
	employeeID: number;
	jobTitle: string;
	salary?: number; // optional initially
	experience: number;
	gender: string;
	companyID: number;
}

interface Salary {
	employeeID: number;
	salary: number;
	timestamp: string;
}

const InsightPage: React.FC = () => {
	const isDesktop = useIsDesktop();
	const [searchTerm, setSearchTerm] = useState("");

	// Fetch employee data
	const {
		data: employees,
		isLoading,
		isError,
		error,
	} = useQuery<Employee[]>({
		queryKey: ["employees"],
		queryFn: fetchEmployees,
	});

	// Fetch salary data
	const { data: salaries } = useQuery<Salary[]>({
		queryKey: ["salaries"],
		queryFn: fetchAllSalaries,
	});

	// Merge salaries into employees
	const mergedEmployees = employees?.map((employee) => {
		const latestSalary = salaries
			?.filter((s) => s.employeeID === employee.employeeID)
			.sort(
				(a, b) =>
					new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
			)[0];

		return {
			...employee,
			salary: latestSalary?.salary ?? "N/A",
		};
	});

	// Apply search filter
	const filteredEmployees = mergedEmployees
		?.filter((employee) => {
			const search = searchTerm.trim().toLowerCase();

			if (/^\d+$/.test(search)) {
				return String(employee.employeeID).includes(search);
			}

			return (
				employee.jobTitle.toLowerCase().includes(search) ||
				employee.gender.toLowerCase().includes(search)
			);
		})
		.sort((a, b) => a.employeeID - b.employeeID);

	return (
		<div className="h-screen w-screen flex flex-col relative">
			<div className="relative z-10 flex flex-col h-full">
				<Header />
				<div className="flex flex-1 overflow-y-auto pt-14">
					{isDesktop && <Sidebar />}
					<main className="flex-1 p-4 text-black">
						<h1 className="text-3xl font-bold mb-4 text-center">
							Employee Insights
						</h1>

						{/* Loading */}
						{isLoading && <p className="text-center">Loading...</p>}

						{/* Error */}
						{isError && (
							<div className="text-center text-red-500">
								<p>Error fetching employees.</p>
								<p>{(error as Error)?.message}</p>
							</div>
						)}

						{/* Search Bar and Table/Message */}
						{!isLoading && !isError && (
							<div className="w-full max-w-[95%] md:max-w-6xl mx-auto py-4">
								{/* Always show the search bar */}
								<div className="flex justify-center mb-2 md:mb-6">
									<div className="relative w-full">
										<FontAwesomeIcon
											icon={faSearch}
											className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[8px] md:text-base"
										/>
										<InputField
											data-testid="employee-search"
											placeholder="Search employee data..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											className="w-full h-7 md:h-9 pl-6 md:pl-10 text-[10px] md:text-base text-black bg-white border border-sky-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
										/>
									</div>
								</div>

								{/* Conditionally show the table or "No employee data found" message */}
								{filteredEmployees && filteredEmployees.length > 0 ? (
									<EmployeeTable
										editable={false}
										data={filteredEmployees.map((e) => ({
											id: e.employeeID,
											jobTitle: e.jobTitle,
											salary: e.salary,
											gender: e.gender,
											experience: e.experience,
											companyID: e.companyID,
										}))}
									/>
								) : (
									<p
										className="text-center mt-4"
										data-testid="no-employees-message"
									>
										No employee data found.
									</p>
								)}
							</div>
						)}
					</main>
				</div>
				<footer className="p-2 bg-gray-800 text-white text-center text-xs relative z-10">
					<p>2025 AES-Insight. All rights reserved.</p>
				</footer>
			</div>
		</div>
	);
};

export default InsightPage;
