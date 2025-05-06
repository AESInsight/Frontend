import React, { useEffect, useState } from "react";
import EditButton from "../buttons/edit_button";
import { fetchAllSalaries, fetchEmployees } from "../../lib/employeeAPI";

export interface TableRow {
	id?: number | string;
	jobTitle: string;
	salary: number | string;
	gender: string;
	experience: number | string;
}

// Genbrug Employee og Salary interfaces
interface Employee {
	employeeID: number;
	jobTitle: string;
	gender: string;
	experience: number;
	companyID: number;
}

interface Salary {
	employeeID: number;
	salary: number;
	timestamp: string;
}

interface EmployeeTableProps {
	data?: TableRow[];
	editable?: boolean;
	onSave?: (index: number, updatedData: TableRow) => void;
	onDelete?: (index: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
	editable = true,
	onSave,
	onDelete,
}) => {
	const [data, setData] = useState<TableRow[]>([]);

	useEffect(() => {
		const loadData = async () => {
			try {
				const employees: Employee[] = await fetchEmployees();
				const salaries: Salary[] = await fetchAllSalaries();

				// Merge salaries into employees
				const mergedData = employees.map((employee) => {
					const latestSalary = salaries
						.filter((salary) => salary.employeeID === employee.employeeID)
						.sort(
							(a, b) =>
								new Date(b.timestamp).getTime() -
								new Date(a.timestamp).getTime()
						)[0];

					return {
						id: employee.employeeID,
						jobTitle: employee.jobTitle,
						salary: latestSalary ? latestSalary.salary : "N/A",
						gender: employee.gender,
						experience: employee.experience,
					};
				});

				setData(mergedData);
			} catch (error) {
				console.error("Failed to load data:", error);
			}
		};

		loadData();
	}, []);

	return (
		<div className="bg-white shadow-lg rounded-xl overflow-hidden w-full" data-testid="employee-table">
			{/* Table header */}
			<div
				className={`grid ${editable ? "grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr]" : "grid-cols-[1fr_2fr_1fr_1fr_1fr]"} bg-gradient-to-r from-sky-600 to-sky-500 text-white font-bold`}
				data-testid="table-header"
			>
				<div className="p-4" data-testid="header-id">ID</div>
				<div className="p-4" data-testid="header-job-title">Job Title</div>
				<div className="p-4" data-testid="header-salary">Salary</div>
				<div className="p-4" data-testid="header-experience">Experience</div>
				<div className="p-4" data-testid="header-gender">Gender</div>
				{editable && <div className="p-4 text-center" data-testid="header-edit">Edit</div>}
			</div>

			{/* Table body */}
			<div className="overflow-y-auto max-h-96" data-testid="table-body">
				{data.map((row, index) => (
					<div
						key={row.id ?? index}
						className={`grid ${editable ? "grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr]" : "grid-cols-[1fr_2fr_1fr_1fr_1fr]"} border-b border-gray-200 hover:bg-blue-50`}
						data-testid={`table-row-${index}`}
					>
						<div className="p-4 text-gray-700" data-testid={`row-${index}-id`}>{row.id ?? "N/A"}</div>
						<div className="p-4 text-gray-700" data-testid={`row-${index}-job-title`}>{row.jobTitle || "N/A"}</div>
						<div className="p-4 text-gray-700" data-testid={`row-${index}-salary`}>{row.salary || "N/A"} kr.</div>
						<div className="p-4 text-gray-700" data-testid={`row-${index}-experience`}>
							{row.experience
								? `${row.experience} ${parseInt(row.experience.toString()) === 1 ? "yr." : "yrs."}`
								: "-"}
						</div>
						<div className="p-4 text-gray-700" data-testid={`row-${index}-gender`}>{row.gender || "N/A"}</div>
						{editable && (
							<div className="p-4 flex justify-center" data-testid={`row-${index}-edit`}>
								<EditButton
									position={row.jobTitle}
									salary={row.salary ? row.salary.toString() : ""}
									gender={row.gender}
									experience={row.experience.toString()}
									onSave={(updatedData) => onSave && onSave(index, { ...row, ...updatedData })}
									onDelete={() => onDelete && onDelete(index)}
								/>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default EmployeeTable;
