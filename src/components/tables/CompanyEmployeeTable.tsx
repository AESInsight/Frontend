import React, { useState, useEffect } from "react";
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
	const [, setSortedData] = useState([...data]);
	const [sortConfig, setSortConfig] = useState<{
		key: SortKey;
		direction: "asc" | "desc";
	}>({ key: "id", direction: "asc" });

	useEffect(() => {
		handleSort(sortConfig.key, sortConfig.direction); // re-sort on data change
	}, [data]);

	const handleSort = (key: SortKey, directionOverride?: "asc" | "desc") => {
		const direction =
			directionOverride ||
			(sortConfig.key === key && sortConfig.direction === "asc"
				? "desc"
				: "asc");

		const sorted = [...data].sort((a, b) => {
			const aVal = a[key];
			const bVal = b[key];

			if (typeof aVal === "number" && typeof bVal === "number") {
				return direction === "asc" ? aVal - bVal : bVal - aVal;
			}

			return direction === "asc"
				? aVal.toString().localeCompare(bVal.toString())
				: bVal.toString().localeCompare(aVal.toString());
		});

		setSortedData(sorted);
		setSortConfig({ key, direction });
	};

	const getSortIndicator = (key: SortKey) => {
		if (sortConfig.key !== key) return "";
		return sortConfig.direction === "asc" ? "↑" : "↓";
	};

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
				<div className="p-1 md:p-4 cursor-pointer" onClick={() => handleSort("id")}>
          ID {getSortIndicator("id")}
        </div>
				<div
          className="p-1 md:p-4 cursor-pointer"
          onClick={() => handleSort("jobTitle")}
          >
					Job {getSortIndicator("jobTitle")}
        </div>
      
				<div
          className="p-1 md:p-4 cursor-pointer"
          onClick={() => handleSort("salary")}
          >
          Sal {getSortIndicator("salary")}
        </div>
				<div
          className="p-1 md:p-4 cursor-pointer"
          onClick={() => handleSort("experience")}
          >
          Exp {getSortIndicator("experience")}
        </div>
				<div
          className="p-1 md:p-4 cursor-pointer"
          onClick={() => handleSort("gender")}
          >
          Gen {getSortIndicator("gender")}
        </div>
				{editable && <div className="p-1 md:p-4 text-center">Edit</div>}
			</div>

			{/* Table Body */}
			<div className="overflow-x-auto">
				{data.map((employee, index) => (
					<div
						key={employee.id}
						className="grid grid-cols-[0.7fr_2fr_1.2fr_1fr_1fr_0.7fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] border-b border-gray-200 hover:bg-blue-50 text-[8px] md:text-base"
					>
						<div className="p-3 md:p-4 text-gray-700">{employee.id}</div>
						<div className="p-3 md:p-4 text-gray-700">
							{employee.jobTitle || "N/A"}
						</div>
						<div className="p-3 md:p-4 text-gray-700">
							{employee.salary ? `${employee.salary} kr.` : "N/A"}
						</div>
						<div className="p-3 md:p-4 text-gray-700">
							{employee.experience ? `${employee.experience} yrs` : "N/A"}
						</div>
						<div className="p-3 md:p-4 text-gray-700">
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
