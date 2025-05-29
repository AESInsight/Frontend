import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
	fetchCompanyEmployees,
	fetchAllSalaries,
	type Employee,
	updateEmployee,
	deleteEmployee,
} from "../../lib/employeeAPI";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";
import { useAuth } from "@/lib/context/auth_context";
import CompanyEmployeeTable from "../tables/CompanyEmployeeTable";
import AddEmployeeButton from "../buttons/add_employee_button";
import InputField from "../fields/input_field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useIsDesktop } from "@/lib/context/desktop_context";

interface EmployeeUpdateData {
	jobTitle: string;
	salary: number;
	gender: string;
	experience: number;
}

interface SalaryEntry {
	employeeID: number;
	salary: number;
	timestamp: string;
}

const AdminPage: React.FC = () => {
	const { token } = useAuth();
	const queryClient = useQueryClient();
	const [employees, setEmployees] = useState<Employee[]>([]);
	const isDesktop = useIsDesktop();
	const [searchTerm, setSearchTerm] = useState("");

	// Fetch employees and salaries
	const { isLoading } = useQuery({
		queryKey: ["companyEmployees", token],
		queryFn: async () => {
			if (!token) return [];
			const companyId = parseInt(localStorage.getItem("companyId") || "0");
			if (!companyId) {
				return [];
			}

			const employees = await fetchCompanyEmployees(companyId);
			const salaries: SalaryEntry[] = await fetchAllSalaries();

			const mergedData = employees.map((employee) => {
				const latestSalary = salaries
					.filter((salary) => salary.employeeID === employee.employeeID)
					.sort(
						(a, b) =>
							new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
					)[0];

				return {
					...employee,
					salary: latestSalary ? latestSalary.salary : 0,
				};
			});

			setEmployees(mergedData);
			return mergedData;
		},
		enabled: !!token,
	});

	const handleEmployeeAdded = async () => {
		await queryClient.invalidateQueries({
			queryKey: ["companyEmployees", token],
		});
	};

	const handleSave = async (index: number, updatedData: EmployeeUpdateData) => {
		try {
			const employeeId = employees[index].employeeID;

			await updateEmployee(employeeId, {
				...updatedData,
				companyID: parseInt(localStorage.getItem("companyId") || "0"),
			});

			const newData = [...employees];
			newData[index] = { ...newData[index], ...updatedData };
			setEmployees(newData);

			await queryClient.invalidateQueries({
				queryKey: ["companyEmployees", token],
			});
		} catch (error) {
			console.error("Error saving employee:", error);
		}
	};

	const handleDelete = async (index: number) => {
		try {
			const employeeId = employees[index].employeeID;

			await deleteEmployee(employeeId);

			const newData = [...employees];
			newData.splice(index, 1);
			setEmployees(newData);

			await queryClient.invalidateQueries({
				queryKey: ["companyEmployees", token],
			});
		} catch (error) {
			console.error("Error deleting employee:", error);
		}
	};

	const filteredEmployees = employees.filter((emp) => {
		const search = searchTerm.trim().toLowerCase();

		if (/^\d+$/.test(search)) {
			return String(emp.employeeID).includes(search);
		}

		return (
			emp.jobTitle.toLowerCase().includes(search) ||
			emp.gender.toLowerCase().includes(search)
		);
	});

	return (
		<div className="h-screen w-screen flex flex-col relative">
			<div className="relative z-10 flex flex-col h-full">
				<Header />
				<div className="flex flex-1 overflow-y-auto pt-14">
					{isDesktop && <Sidebar />}
					<main className="flex-1 p-2 md:p-4 md:pl-8 text-black">
						<h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-center">
							Admin Page
						</h1>
						<p className="mb-4 md:mb-6 text-center text-sm md:text-base">
							Add / Edit / Delete Employees for your Company
						</p>

						{/* Search Bar */}
						<div className="flex justify-center mb-4 md:mb-6">
							<div className="relative w-full max-w-[95%] md:max-w-6xl">
								<FontAwesomeIcon
									icon={faSearch}
									className="absolute left-2 md:left-3 top-[45%] md:top-1/2 transform -translate-y-1/2 text-gray-500 text-[8px] md:text-base"
								/>
								<InputField
									data-testid="employee-search"
									placeholder="Search employee data..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full h-7 md:h-9 pl-5 md:pl-10 p-1.5 md:p-2 text-[10px] md:text-base text-black bg-white border border-sky-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 mt-2 md:mt-4"
								/>
							</div>
						</div>

						{!token && (
							<div className="text-center text-red-500 mt-4">
								<p>You must be logged in to view this page.</p>
							</div>
						)}

						{token && !localStorage.getItem("companyId") && (
							<div className="text-center text-red-500 mt-4">
								<p>
									You must be logged in with a company account to view this
									page.
								</p>
							</div>
						)}

						{isLoading && <p className="text-center">Loading...</p>}

						{token && localStorage.getItem("companyId") && !isLoading && (
							<div className="w-full max-w-[95%] md:max-w-6xl mx-auto py-4">
								{/* Always show the search bar and AddEmployeeButton */}
								<div className="flex items-center gap-2 md:gap-4 mb-4">
									<AddEmployeeButton onEmployeeAdded={handleEmployeeAdded} />
									<div className="flex-1 relative">
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
								{filteredEmployees.length > 0 ? (
									<CompanyEmployeeTable
										data-testid="employee-table"
										editable={true}
										data={filteredEmployees.map((emp) => ({
											id: emp.employeeID,
											jobTitle: emp.jobTitle,
											salary: emp.salary,
											gender: emp.gender,
											experience: emp.experience,
											companyID: emp.companyID,
										}))}
										onSave={handleSave}
										onDelete={handleDelete}
									/>
								) : (
									<div className="text-center">
										<p data-testid="no-employees-message">
											No employee data found.
										</p>
									</div>
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

export default AdminPage;
