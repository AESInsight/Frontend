import React, { useState, useMemo } from "react";
import EditButton from "../buttons/edit_button";

interface EmployeeUpdateData {
	jobTitle: string;
	salary: number;
	gender: string;
	experience: number;
}

interface CompanyEmployeeTableProps {
	editable?: boolean;
	data: Array<{
		id: number;
		jobTitle: string;
		salary: number;
		gender: string;
		experience: number;
		companyID?: number;
	}>;
	onSave?: (index: number, updatedData: EmployeeUpdateData) => void;
	onDelete?: (index: number) => void;
}

type SortKey = "id" | "jobTitle" | "salary" | "experience" | "gender";

const CompanyEmployeeTable: React.FC<CompanyEmployeeTableProps> = ({
	editable = false,
	data,
	onSave,
	onDelete,
}) => {
	const [sortConfig, setSortConfig] = useState<{
		key: SortKey;
		direction: "asc" | "desc";
	}>({ key: "id", direction: "asc" });

	const handleSort = (key: SortKey) => {
		setSortConfig((prev) => {
			const newDirection =
				prev.key === key && prev.direction === "asc" ? "desc" : "asc";
			console.log(`Sorting by ${key} in ${newDirection} order`); // Debugging log
			return { key, direction: newDirection };
		});
	};

	const getSortIndicator = (key: SortKey) => {
		if (sortConfig.key !== key) return "";
		return sortConfig.direction === "asc" ? "↑" : "↓";
	};

	// Memoize the sorted data to ensure it updates with sortConfig
	const sortedData = useMemo(() => {
		console.log("Computing sortedData with sortConfig:", sortConfig); // Debugging log
		return [...data].sort((a, b) => {
			const { key, direction } = sortConfig;
			const aVal = a[key];
			const bVal = b[key];

			// Handle numeric fields (id, salary, experience)
			if (["id", "salary", "experience"].includes(key)) {
				const aNum =
					aVal === undefined || aVal === null ? -Infinity : Number(aVal);
				const bNum =
					bVal === undefined || bVal === null ? -Infinity : Number(bVal);
				console.log(`Comparing ${key}: ${aNum} vs ${bNum} (${direction})`); // Debugging log
				return direction === "asc" ? aNum - bNum : bNum - aNum;
			}

			// Handle string fields (jobTitle, gender)
			const aStr = aVal?.toString() || "";
			const bStr = bVal?.toString() || "";
			console.log(`Comparing ${key}: ${aStr} vs ${bStr} (${direction})`); // Debugging log
			return direction === "asc"
				? aStr.localeCompare(bStr)
				: bStr.localeCompare(aStr);
		});
	}, [data, sortConfig]);

	const handleSave = async (index: number, updatedData: EmployeeUpdateData) => {
		if (onSave) {
			onSave(index, updatedData);
		}
	};

	const handleDelete = async (index: number) => {
		if (onDelete) {
			onDelete(index);
		}
	};

	return (
		<div className="bg-white shadow-lg rounded-xl overflow-hidden w-full">
			{/* Table Header */}
			<div className="grid grid-cols-[0.7fr_2fr_1.2fr_1fr_1fr_0.7fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] bg-gradient-to-r from-sky-600 to-sky-500 text-white font-bold text-[8px] md:text-base">
				<div
					className="p-1 md:p-4 cursor-pointer"
					onClick={() => handleSort("id")}
					data-testid="header-id"
				>
					ID {getSortIndicator("id")}
				</div>
				<div
					className="p-1 md:p-4 cursor-pointer"
					onClick={() => handleSort("jobTitle")}
					data-testid="header-job"
				>
					Job Title {getSortIndicator("jobTitle")}
				</div>
				<div
					className="p-1 md:p-4 cursor-pointer"
					onClick={() => handleSort("salary")}
					data-testid="header-salary"
				>
					Salary {getSortIndicator("salary")}
				</div>
				<div
					className="p-1 md:p-4 cursor-pointer"
					onClick={() => handleSort("experience")}
					data-testid="header-experience"
				>
					Experience {getSortIndicator("experience")}
				</div>
				<div
					className="p-1 md:p-4 cursor-pointer"
					onClick={() => handleSort("gender")}
					data-testid="header-gender"
				>
					Gender {getSortIndicator("gender")}
				</div>
				{editable && <div className="p-1 md:p-4 text-center">Edit</div>}
			</div>

			{/* Table Body */}
			<div className="overflow-x-auto max-h-96">
				{sortedData.map((employee, index) => (
					<div
						key={employee.id}
						data-testid="employee-row"
						className="grid grid-cols-[0.7fr_2fr_1.2fr_1fr_1fr_0.7fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] border-b border-gray-200 hover:bg-blue-50 text-[8px] md:text-base"
					>
						<div data-testid="employee-id" className="p-3 md:p-4 text-gray-700">
							{employee.id}
						</div>
						<div
							data-testid="employee-job-title"
							className="p-3 md:p-4 text-gray-700"
						>
							{employee.jobTitle || "N/A"}
						</div>
						<div
							data-testid="employee-salary"
							className="p-3 md:p-4 text-gray-700"
						>
							{employee.salary ? `${employee.salary} kr.` : "N/A"}
						</div>
						<div
							data-testid="employee-experience"
							className="p-3 md:p-4 text-gray-700"
						>
							{employee.experience ? `${employee.experience} yrs` : "N/A"}
						</div>
						<div
							data-testid="employee-gender"
							className="p-3 md:p-4 text-gray-700"
						>
							{employee.gender || "N/A"}
						</div>
						{editable && (
							<div className="p-3 md:p-4 flex justify-center">
								<EditButton
									id={employee.id}
									position={employee.jobTitle || ""}
									salary={employee.salary?.toString() || "0"}
									gender={employee.gender || ""}
									experience={employee.experience?.toString() || "0"}
									companyID={employee.companyID || 0}
									onSave={(updatedData) =>
										handleSave(index, {
											jobTitle: updatedData.position,
											salary: Number(updatedData.salary) || 0,
											gender: updatedData.gender,
											experience: Number(updatedData.experience) || 0,
										})
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

export default CompanyEmployeeTable;
