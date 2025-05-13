import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCompanyEmployees, type Employee, updateEmployee, deleteEmployee } from "../../lib/employeeAPI";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import InputField from "../fields/input_field";
import { useAuth } from "@/lib/context/auth_context";
import CompanyEmployeeTable from "../tables/CompanyEmployeeTable";
import { useQueryClient } from "@tanstack/react-query";

interface EmployeeUpdateData {
	jobTitle: string;
	salary: number;
	gender: string;
	experience: number;
}

const AdminPage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const { isAuthenticated } = useAuth();
	const companyId = localStorage.getItem('companyId');
	const token = localStorage.getItem('authToken');
	const queryClient = useQueryClient();
	const [tableData, setTableData] = useState<Array<{
		id: number;
		jobTitle: string;
		salary: number;
		gender: string;
		experience: number;
	}>>([]);

	useEffect(() => {
		console.log('Admin Page State:', {
			isAuthenticated,
			companyId,
			token: token ? 'exists' : 'missing',
			storedCompanyId: localStorage.getItem('companyId'),
			storedToken: localStorage.getItem('authToken')
		});
	}, [isAuthenticated, companyId, token]);

	const {
		data: employees,
		isLoading,
		isError,
		error,
	} = useQuery<Employee[]>({
		queryKey: ["employees", companyId],
		queryFn: () => {
			console.log('Fetching employees with:', { companyId, token: token ? 'exists' : 'missing' });
			if (!token) {
				throw new Error("Not authenticated");
			}
			if (!companyId) {
				throw new Error("No company ID found");
			}
			return fetchCompanyEmployees(parseInt(companyId));
		},
		enabled: !!token && !!companyId,
		retry: false
	});

	// Filter employees based on search term
	const filteredEmployees = employees
		?.filter((employee: Employee) => {
			const search = searchTerm.toLowerCase();
			return (
				employee.jobTitle.toLowerCase().includes(search) ||
				employee.gender.toLowerCase().includes(search) ||
				String(employee.employeeID).includes(search) ||
				String(employee.experience).includes(search)
			);
		})
		.sort((a: Employee, b: Employee) => a.employeeID - b.employeeID);

	// Transform the data for the table
	useEffect(() => {
		const newTableData = filteredEmployees?.map((e: Employee) => ({
			id: e.employeeID,
			jobTitle: e.jobTitle || '',
			salary: e.salary || 0,
			gender: e.gender || '',
			experience: e.experience || 0,
		})) || [];
		setTableData(newTableData);
	}, [filteredEmployees]);

	const handleSave = async (index: number, updatedData: EmployeeUpdateData) => {
		try {
			// Get the employee ID from the current data
			const employeeId = tableData[index].id;
			
			// Call the API to update the employee
			await updateEmployee(employeeId, {
				...updatedData,
				companyID: parseInt(companyId || "0")
			});

			// Update local state and invalidate cache
			const newData = [...tableData];
			newData[index] = { ...newData[index], ...updatedData };
			setTableData(newData);
			await queryClient.invalidateQueries({ queryKey: ["employees", companyId] });
		} catch (error) {
			console.error("Error saving employee:", error);
		}
	};

	const handleDelete = async (index: number) => {
		try {
			// Get the employee ID from the current data
			const employeeId = tableData[index].id;
			
			// Call the API to delete the employee
			await deleteEmployee(employeeId);

			// Update local state and invalidate cache
			const newData = [...tableData];
			newData.splice(index, 1);
			setTableData(newData);
			await queryClient.invalidateQueries({ queryKey: ["employees", companyId] });
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

						{token && !companyId && (
							<div className="text-center text-red-500 mt-4">
								<p>You must be logged in with a company account to view this page.</p>
							</div>
						)}

						{isError && (
							<div className="text-center text-red-500">
								<p>Error: {(error as Error)?.message}</p>
							</div>
						)}

						{/* Search Bar */}
						<div className="flex justify-center mb-6">
							<div className="relative w-120">
								<FontAwesomeIcon
									icon={faSearch}
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
								/>
								<InputField
									placeholder="Search employee data..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full h-9 pl-10 p-2 text-black bg-white border border-sky-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 mt-4"
								/>
							</div>
						</div>

						{isLoading && <p className="text-center">Loading...</p>}

						{tableData.length > 0 ? (
							<div className="max-w-6xl mx-auto w-full px-4">
								<CompanyEmployeeTable
									editable={true}
									data={tableData}
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
