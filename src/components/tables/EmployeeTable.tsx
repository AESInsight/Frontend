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
		direction: "asc" | "desc" | null;
	}>({ key: "id", direction: null });

	useEffect(() => {
		const loadData = async () => {
			try {
				const employees: Employee[] = await fetchEmployees();
				const salaries: Salary[] = await fetchAllSalaries();

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

	const handleSort = (key: keyof TableRow) => {
		setSortConfig((prev) => {
			if (prev.key === key && prev.direction === "asc") {
				return { key, direction: "desc" };
			} else if (prev.key === key && prev.direction === "desc") {
				return { key, direction: null };
			}
			return { key, direction: "asc" };
		});
	};

	const sortedData = [...data].sort((a, b) => {
		if (sortConfig.direction === null) return 0;

		const aValue = a[sortConfig.key];
		const bValue = b[sortConfig.key];

		// Handle numeric values (id, salary, experience)
		if (
			sortConfig.key === "id" ||
			sortConfig.key === "salary" ||
			sortConfig.key === "experience"
		) {
			const aNum =
				typeof aValue === "string" && aValue === "N/A"
					? -Infinity
					: Number(aValue);
			const bNum =
				typeof bValue === "string" && bValue === "N/A"
					? -Infinity
					: Number(bValue);

			if (sortConfig.direction === "asc") {
				return aNum - bNum;
			} else {
				return bNum - aNum;
			}
		}

		// Handle string values (jobTitle, gender)
		const aStr = aValue?.toString() || "";
		const bStr = bValue?.toString() || "";
		if (sortConfig.direction === "asc") {
			return aStr.localeCompare(bStr);
		} else {
			return bStr.localeCompare(aStr);
		}
	});

	return (
		<div className="bg-white shadow-lg rounded-xl overflow-hidden w-full">
			{/* Table header */}
			<div
				className={`grid ${editable ? "grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr]" : "grid-cols-[1fr_2fr_1fr_1fr_1fr]"} bg-gradient-to-r from-sky-600 to-sky-500 text-white font-bold`}
			>
				<div className="p-4 cursor-pointer" onClick={() => handleSort("id")}>
					ID{" "}
					{sortConfig.key === "id" && sortConfig.direction === "asc"
						? "↑"
						: sortConfig.key === "id" && sortConfig.direction === "desc"
							? "↓"
							: ""}
				</div>
				<div
					className="p-4 cursor-pointer"
					onClick={() => handleSort("jobTitle")}
				>
					Job Title{" "}
					{sortConfig.key === "jobTitle" && sortConfig.direction === "asc"
						? "↑"
						: sortConfig.key === "jobTitle" && sortConfig.direction === "desc"
							? "↓"
							: ""}
				</div>
				<div
					className="p-4 cursor-pointer"
					onClick={() => handleSort("salary")}
				>
					Salary{" "}
					{sortConfig.key === "salary" && sortConfig.direction === "asc"
						? "↑"
						: sortConfig.key === "salary" && sortConfig.direction === "desc"
							? "↓"
							: ""}
				</div>
				<div
					className="p-4 cursor-pointer"
					onClick={() => handleSort("experience")}
				>
					Experience{" "}
					{sortConfig.key === "experience" && sortConfig.direction === "asc"
						? "↑"
						: sortConfig.key === "experience" && sortConfig.direction === "desc"
							? "↓"
							: ""}
				</div>
				<div
					className="p-4 cursor-pointer"
					onClick={() => handleSort("gender")}
				>
					Gender{" "}
					{sortConfig.key === "gender" && sortConfig.direction === "asc"
						? "↑"
						: sortConfig.key === "gender" && sortConfig.direction === "desc"
							? "↓"
							: ""}
				</div>
				{editable && <div className="p-4 text-center">Edit</div>}
			</div>

			{/* Table body */}
			<div className="overflow-y-auto max-h-96">
				{sortedData.map((row, index) => (
					<div
						key={row.id ?? index}
						className={`grid ${editable ? "grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr]" : "grid-cols-[1fr_2fr_1fr_1fr_1fr]"} border-b border-gray-200 hover:bg-blue-50`}
					>
						<div className="p-4 text-gray-700">{row.id ?? "N/A"}</div>
						<div className="p-4 text-gray-700">{row.jobTitle || "N/A"}</div>
						<div className="p-4 text-gray-700">{row.salary || "N/A"} kr.</div>
						<div className="p-4 text-gray-700">
							{row.experience
								? `${row.experience} ${parseInt(row.experience.toString()) === 1 ? "yr." : "yrs."}`
								: "-"}
						</div>
						<div className="p-4 text-gray-700">{row.gender || "N/A"}</div>
						{editable && (
							<div className="p-4 flex justify-center">
								<EditButton
									position={row.jobTitle}
									salary={row.salary ? row.salary.toString() : ""}
									experience={row.experience.toString()}
									gender={row.gender}
									onSave={(updatedData) =>
										onSave && onSave(index, { ...row, ...updatedData })
									}
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
