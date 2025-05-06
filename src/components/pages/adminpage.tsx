import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../../lib/employeeAPI";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import InputField from "../fields/input_field";
import EmployeeTable from "../tables/EmployeeTable";

interface Employee {
	employeeID: number;
	jobTitle: string;
	salary: number;
	experience: number;
	gender: string;
	companyID: number;
}

const InsightPage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const {
		data: employees,
		isLoading,
		isError,
		error,
	} = useQuery<Employee[]>({
		queryKey: ["employees"],
		queryFn: fetchEmployees,
	});

	const filteredEmployees = employees
		?.filter((employee) => {
			const search = searchTerm.toLowerCase();
			return (
				employee.jobTitle.toLowerCase().includes(search) ||
				employee.gender.toLowerCase().includes(search) ||
				String(employee.employeeID).includes(search) ||
				String(employee.salary).includes(search) ||
				String(employee.experience).includes(search)
			);
		})
		.sort((a, b) => a.employeeID - b.employeeID);

	return (
		<div className="h-screen w-screen flex flex-col relative" data-testid="admin-page">
			<div className="relative z-10 flex flex-col h-full" data-testid="admin-content">
				<Header />
				<div className="flex flex-1 overflow-y-auto pt-14" data-testid="admin-main">
					<Sidebar />
					<main className="flex-1 p-4 text-black" data-testid="admin-content-area">
						<h1 className="text-3xl font-bold mb-4 text-center" data-testid="admin-title">Admin Page</h1>

						{/* Search Bar */}
						<div className="flex justify-center mb-6" data-testid="admin-search">
							<div className="relative w-120">
								<FontAwesomeIcon
									icon={faSearch}
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
									data-testid="admin-search-icon"
								/>
								<InputField
									placeholder="Search employee data..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full h-9 pl-10 p-2 text-black bg-white border border-sky-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 mt-4"
									data-testid="admin-search-input"
								/>
							</div>
						</div>

						{isLoading && <p className="text-center" data-testid="admin-loading">Loading...</p>}

						{isError && (
							<div className="text-center text-red-500" data-testid="admin-error">
								<p>Error fetching employees.</p>
								<p>{(error as Error)?.message}</p>
							</div>
						)}

						{filteredEmployees && filteredEmployees.length > 0 ? (
							<div className="max-w-6xl mx-auto w-full px-4" data-testid="admin-table-container">
								<EmployeeTable
									editable={true}
									data={filteredEmployees.map((e) => ({
										id: e.employeeID,
										jobTitle: e.jobTitle,
										salary: e.salary,
										gender: e.gender,
										experience: e.experience,
									}))}
								/>
							</div>
						) : (
							!isLoading && <p className="text-center" data-testid="admin-no-data">No employees found.</p>
						)}
					</main>
				</div>
			</div>
		</div>
	);
};

export default InsightPage;
