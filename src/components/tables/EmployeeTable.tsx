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
	const [sortConfig, setSortConfig] = useState<{
		key: keyof TableRow;
		direction: "asc" | "desc";
	}>({ key: "id", direction: "asc" });

	// Load Data
	const loadData = async () => {
		try {
			const employees: Employee[] = await fetchEmployees();
			const salaries: Salary[] = await fetchAllSalaries();

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

	// Handle Sorting
	const handleSort = (key: keyof TableRow) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
		}));
	};

	const sortedData = [...data].sort((a, b) => {
		const { key, direction } = sortConfig;

		const aValue = a[key];
		const bValue = b[key];

		if (["id", "salary", "experience"].includes(key)) {
			const aNum =
				typeof aValue === "string" && aValue === "N/A"
					? -Infinity
					: Number(aValue);
			const bNum =
				typeof bValue === "string" && bValue === "N/A"
					? -Infinity
					: Number(bValue);
			return direction === "asc" ? aNum - bNum : bNum - aNum;
		}

		const aStr = aValue?.toString() || "";
		const bStr = bValue?.toString() || "";
		return direction === "asc"
			? aStr.localeCompare(bStr)
			: bStr.localeCompare(aStr);
	});

	// Handle Save
	const handleSave = async (index: number, updatedData: TableRow) => {
		setData((prevData) => {
			const newData = [...prevData];
			newData[index] = { ...newData[index], ...updatedData };
			return newData;
		});

		await loadData();

		if (onSave) {
			onSave(index, updatedData);
		}
	};

	// Handle Delete
	const handleDelete = async (index: number) => {
		await loadData();

		if (onDelete) {
			onDelete(index);
		}
	};

	// Render Sort Indicator
	const getSortIndicator = (key: keyof TableRow) => {
		if (sortConfig.key !== key) return "";
		return sortConfig.direction === "asc" ? "↑" : "↓";
	};

	return (
		<div className="bg-white shadow-lg rounded-xl overflow-hidden w-full">
			{/* Table Header */}
			<div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] bg-gradient-to-r from-sky-600 to-sky-500 text-white font-bold">
				<div className="p-4 cursor-pointer" onClick={() => handleSort("id")}>
					ID {getSortIndicator("id")}
				</div>
				<div
					className="p-4 cursor-pointer"
					onClick={() => handleSort("jobTitle")}
				>
					Job Title {getSortIndicator("jobTitle")}
				</div>
				<div
					className="p-4 cursor-pointer"
					onClick={() => handleSort("salary")}
				>
					Salary {getSortIndicator("salary")}
				</div>
				<div
					className="p-4 cursor-pointer"
					onClick={() => handleSort("experience")}
				>
					Experience {getSortIndicator("experience")}
				</div>
				<div
					className="p-4 cursor-pointer"
					onClick={() => handleSort("gender")}
				>
					Gender {getSortIndicator("gender")}
				</div>
				{editable && <div className="p-4 text-center">Edit</div>}
			</div>

			{/* Table Body */}
			<div className="overflow-y-auto max-h-96">
				{sortedData.map((row, index) => (
					<div
						key={row.id ?? index}
						className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] border-b border-gray-200 hover:bg-blue-50"
					>
						<div className="p-4 text-gray-700">{row.id ?? "N/A"}</div>
						<div className="ml-2 p-4 text-gray-700">
							{row.jobTitle || "N/A"}
						</div>
						<div className="ml-4 p-4 text-gray-700">
							{row.salary || "N/A"} kr.
						</div>
						<div className="ml-4 p-4 text-gray-700">
							{row.experience ? `${row.experience} yrs` : "-"}
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
									onSave={(updatedData) =>
										handleSave(index, { ...row, ...updatedData })
									}
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
