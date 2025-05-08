import React, { useEffect, useState } from "react";
import EditButton from "../buttons/edit_button";
import { fetchAllSalaries, fetchEmployees } from "../../lib/employeeAPI";

export interface TableRow {
	id?: number | string;
	jobTitle: string;
	salary: number | string;
	gender: string;
	experience: number | string;
	companyID?: number;
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
							new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
					)[0];

				return {
					id: employee.employeeID,
					jobTitle: employee.jobTitle,
					salary: latestSalary ? latestSalary.salary : "N/A",
					gender: employee.gender,
					experience: employee.experience,
					companyID: employee.companyID,
				};
			});

			setData(mergedData);
		} catch (error) {
			console.error("Failed to load data:", error);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	const handleSave = async (
		index: number,
		updatedData: {
			position: string;
			salary: string;
			gender: string;
			experience: string;
		}
	) => {
		// Update local state immediately for UI responsiveness
		setData((prevData) => {
			const newData = [...prevData];
			newData[index] = {
				...newData[index],
				jobTitle: updatedData.position,
				salary: updatedData.salary || "N/A",
				gender: updatedData.gender,
				experience: updatedData.experience,
			};
			return newData;
		});

		// Re-fetch data to ensure consistency with the backend
		await loadData();

		// Call the parent's onSave if provided
		if (onSave) {
			const updatedRow: TableRow = {
				...data[index],
				jobTitle: updatedData.position,
				salary: updatedData.salary || "N/A",
				gender: updatedData.gender,
				experience: updatedData.experience,
			};
			onSave(index, updatedRow);
		}
	};

	const handleDelete = async (index: number) => {
		// Re-fetch data to ensure consistency with the backend
		await loadData();

		// Call the parent's onDelete if provided
		if (onDelete) {
			onDelete(index);
		}
	};

	return (
		<div className="bg-white shadow-lg rounded-xl overflow-hidden w-full">
			{/* Table header */}
			<div
				className={`grid ${editable ? "grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr]" : "grid-cols-[1fr_2fr_1fr_1fr_1fr]"} bg-gradient-to-r from-sky-600 to-sky-500 text-white font-bold`}
			>
				<div className="p-4">ID</div>
				<div className="p-4">Job Title</div>
				<div className="p-4">Salary</div>
				<div className="p-4">Experience</div>
				<div className="p-4">Gender</div>
				{editable && <div className="p-4">Edit</div>}
			</div>

			{/* Table body */}
			<div className="overflow-y-auto max-h-96">
				{data.map((row, index) => (
					<div
						key={row.id ?? index}
						className={`grid ${editable ? "grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr]" : "grid-cols-[1fr_2fr_1fr_1fr_1fr]"} border-b border-gray-200 hover:bg-blue-50`}
					>
						<div className="p-4 text-gray-700">{row.id ?? "N/A"}</div>
						<div className="p-4 text-gray-700">{row.jobTitle || "N/A"}</div>
						<div className="ml-4 p-4 text-gray-700">
							{row.salary || "N/A"} kr.
						</div>
						<div className="ml-4 p-4 text-gray-700">
							{row.experience
								? `${row.experience} ${parseInt(row.experience.toString()) === 1 ? "yr." : "yrs."}`
								: "-"}
						</div>
						<div className="ml-6 p-4 text-gray-700">{row.gender || "N/A"}</div>
						{editable && (
							<div className="ml-6 p-4 flex justify-center">
								<EditButton
									id={row.id || ""}
									position={row.jobTitle}
									salary={row.salary ? row.salary.toString() : ""}
									gender={row.gender}
									experience={row.experience.toString()}
									companyID={row.companyID || 0}
									onSave={(updatedData) => handleSave(index, updatedData)}
									onDelete={() => handleDelete(index)}
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
