import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../../lib/employeeAPI";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import InputField from "../fields/input_field";

// Define the Employee type
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

	// Log only when data is available or during debugging
	if (!isLoading && employees) {
		console.log("Employees data (raw):", employees);
	}

	// Filter employees based on search term
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
		.sort((a, b) => a.employeeID - b.employeeID); // Sort by EmployeeID in ascending order


	return (
		<div className="h-screen w-screen flex flex-col relative">
			<div className="relative z-10 flex flex-col h-full">
				<Header />
				<div className="flex flex-1">
					<Sidebar />
					<main className="flex-1 p-4 text-black">
						<h1 className="text-3xl font-bold mb-4 text-center">
							Employee Insights
						</h1>

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

						{/* Handle loading state */}
						{isLoading && <p>Loading...</p>}

						{/* Handle error state */}
						{isError && (
							<div>
								<p>Error fetching employees.</p>
								<p className="text-red-500">{(error as Error)?.message}</p>
							</div>
						)}

						{/* Render employees table when data is available */}
						{filteredEmployees && filteredEmployees.length > 0 ? (
							<table className="w-full border border-gray-300">
								<thead className="bg-gray-200">
									<tr>
										<th className="px-4 py-2">ID</th>
										<th className="px-4 py-2">Job Title</th>
										<th className="px-4 py-2">Salary</th>
										<th className="px-4 py-2">Experience</th>
										<th className="px-4 py-2">Gender</th>
									</tr>
								</thead>
								<tbody>
									{filteredEmployees.map((employee) => (
											<tr key={employee.employeeID}>
												<td className="border px-4 py-2">
													{employee.employeeID || "N/A"}
												</td>
												<td className="border px-4 py-2">
													{employee.jobTitle || "N/A"}
												</td>
												<td className="border px-4 py-2">
													{employee.salary || "N/A"}
												</td>
												<td className="border px-4 py-2">
													{employee.experience || "N/A"}
												</td>
												<td className="border px-4 py-2">
													{employee.gender || "N/A"}
												</td>
											</tr>
										))}
								</tbody>
							</table>
						) : (
							!isLoading && <p>No employees found.</p>
						)}
					</main>
				</div>
			</div>
		</div>
	);
};

export default InsightPage;
