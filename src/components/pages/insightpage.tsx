import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../../lib/api";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";

const InsightPage: React.FC = () => {
	const {
		data: employees,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["employees"],
		queryFn: fetchEmployees,
	});

	// Log only when data is available or during debugging
	if (!isLoading && employees) {
		console.log("Employees data (raw):", employees);
	}

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
						{employees && employees.length > 0 ? (
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
									{employees &&
										employees
											.sort((a: any, b: any) => a.employeeID - b.employeeID) // Sort by EmployeeID in ascending order
											.map((employee: any, index: number) => (
												<tr key={employee.employeeID || index}>
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
