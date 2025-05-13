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

			// Merge employees with their latest salary
			const mergedData = employees.map((employee) => {
				const latestSalary = salaries
					.filter(
						(salary: SalaryEntry) => salary.employeeID === employee.employeeID
					)
					.sort(
						(a: SalaryEntry, b: SalaryEntry) =>
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

	// Handle employee addition
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

	return (
		<div className="h-screen w-screen flex flex-col relative">
			<div className="relative z-10 flex flex-col h-full">
				<Header />
				<div className="flex flex-1 overflow-y-auto pt-14">
					<Sidebar />
					<main className="flex-1 p-4 text-black">
						<h1 className="text-3xl font-bold mb-4 text-center">Admin Page</h1>

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

						{employees.length > 0 ? (
							<div className="max-w-6xl mx-auto w-full px-4">
								<div className="mb-4">
									<AddEmployeeButton onEmployeeAdded={handleEmployeeAdded} />{" "}
									{/* Pass callback */}
								</div>
								<CompanyEmployeeTable
									editable={true}
									data={employees.map((emp) => ({
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
							</div>
						) : (
							!isLoading && <p className="text-center">No employees found.</p>
						)}
					</main>
				</div>
			</div>
		</div>
	);
};

export default AdminPage;
