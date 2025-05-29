import React, { useState } from "react";
import EditButton from "../buttons/edit_button";

export interface TableRow {
	id?: number | string;
	jobTitle: string;
	salary: number | string;
	gender: string;
	experience: number | string;
	companyID?: number;
}

interface EmployeeTableProps {
	data?: TableRow[];
	editable?: boolean;
	onSave?: (index: number, updatedData: TableRow) => void;
	onDelete?: (index: number) => void;
	searchText?: string;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
	data = [],
	editable = true,
	onSave,
	onDelete,
	searchText = "",
}) => {
	const [sortConfig, setSortConfig] = useState<{
		key: keyof TableRow;
		direction: "asc" | "desc";
	}>({ key: "id", direction: "asc" });

	const handleSort = (key: keyof TableRow) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
		}));
	};

	const getSortIndicator = (key: keyof TableRow) => {
		if (sortConfig.key !== key) return "";
		return sortConfig.direction === "asc" ? "↑" : "↓";
	};

	// Filter rows based on searchText
	const filteredData = data.filter((row) => {
		const search = searchText.toLowerCase();
		return (
			row.jobTitle.toLowerCase().includes(search) ||
			row.gender.toLowerCase().includes(search) ||
			String(row.id).includes(search) ||
			String(row.salary).includes(search) ||
			String(row.experience).includes(search)
		);
	});

	// Sort filtered data
	const sortedData = [...filteredData].sort((a, b) => {
		const { key, direction } = sortConfig;

		const aVal = a[key];
		const bVal = b[key];

		if (["id", "salary", "experience"].includes(key)) {
			const aNum =
				typeof aVal === "string" && aVal === "N/A" ? -Infinity : Number(aVal);
			const bNum =
				typeof bVal === "string" && bVal === "N/A" ? -Infinity : Number(bVal);
			return direction === "asc" ? aNum - bNum : bNum - aNum;
		}

		const aStr = aVal?.toString() || "";
		const bStr = bVal?.toString() || "";
		return direction === "asc"
			? aStr.localeCompare(bStr)
			: bStr.localeCompare(aStr);
	});

	const handleSave = async (index: number, updatedData: TableRow) => {
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
			<div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] bg-sky-600 text-white font-bold text-[8px] md:text-base">
				<div
					data-testid="header-id"
					className="p-1 md:p-4 cursor-pointer"
					onClick={() => handleSort("id")}
				>
					ID {getSortIndicator("id")}
				</div>
				<div
					data-testid="header-job"
					className="p-1 md:p-4 cursor-pointer"
					onClick={() => handleSort("jobTitle")}
				>
					Job Title {getSortIndicator("jobTitle")}
				</div>
				<div
					data-testid="header-salary"
					className="p-1 md:p-4 cursor-pointer"
					onClick={() => handleSort("salary")}
				>
					Salary {getSortIndicator("salary")}
				</div>
				<div
					data-testid="header-experience"
					className="p-1 md:p-4 cursor-pointer"
					onClick={() => handleSort("experience")}
				>
					Experience {getSortIndicator("experience")}
				</div>
				<div
					data-testid="header-gender"
					className="p-1 md:p-4 cursor-pointer"
					onClick={() => handleSort("gender")}
				>
					Gender {getSortIndicator("gender")}
				</div>
				{editable && (
					<div data-testid="header-edit" className="p-1 md:p-4 text-center">
						Edit
					</div>
				)}
			</div>

			{/* Table Body */}
			<div className="overflow-y-auto max-h-96">
				{sortedData.map((row, index) => (
					<div
						key={row.id ?? index}
						className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] border-b border-gray-200 hover:bg-blue-50 text-[8px] md:text-base"
					>
						<div data-testid="employee-id" className="p-1 md:p-4 text-gray-700">
							{row.id ?? "N/A"}
						</div>
						<div
							data-testid="employee-job-title"
							className="p-1 md:p-4 text-gray-700 truncate"
						>
							{row.jobTitle || "N/A"}
						</div>
						<div
							data-testid="employee-salary"
							className="p-1 md:p-4 text-gray-700"
						>
							{row.salary || "N/A"} kr
						</div>
						<div
							data-testid="employee-experience"
							className="p-1 md:p-4 text-gray-700"
						>
							{row.experience ? `${row.experience}y` : "N/A"}
						</div>
						<div
							data-testid="employee-gender"
							className="p-1 md:p-4 text-gray-700"
						>
							{row.gender || "N/A"}
						</div>
						{editable && (
							<div className="p-1 md:p-4 flex justify-center">
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
