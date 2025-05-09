import React, { useEffect, useState } from "react";
import InputField from "../fields/input_field";
import {
	updateEmployee,
	deleteEmployee,
	fetchJobTitles,
} from "../../lib/employeeAPI";
import { Select } from "../ui/select";
import StatusModal from "./status_modal";

interface EditModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (updatedData: {
		position: string;
		salary: string;
		gender: string;
		experience: string;
	}) => void;
	onDelete: () => void;
	initialData: {
		id: number | string;
		position: string;
		salary: string;
		gender: string;
		experience: string;
		companyID: number;
	};
}

const EditModal: React.FC<EditModalProps> = ({
	isOpen,
	onClose,
	onSave,
	onDelete,
	initialData,
}) => {
	const [fadeIn, setFadeIn] = useState(false);
	const [editedData, setEditedData] = useState(initialData);
	const [jobTitles, setJobTitles] = useState<string[]>([]);
	const genderOptions = ["Male", "Female"];
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [statusModalState, setStatusModalState] = useState<
		"loading" | "success" | "error"
	>("loading");
	const [statusModalMessage, setStatusModalMessage] = useState<
		string | undefined
	>(undefined);

	// Fetch job titles on mount
	useEffect(() => {
		const loadJobTitles = async () => {
			try {
				const response = await fetchJobTitles();
				const titles = response.jobTitles || [];
				const validTitles = Array.isArray(titles)
					? titles.filter(
							(title) => typeof title === "string" && title.trim() !== ""
						)
					: [];
				setJobTitles(validTitles);
			} catch (error) {
				console.error("Failed to load job titles:", error);
				setJobTitles([]);
			}
		};
		loadJobTitles();
	}, []);

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => setFadeIn(true), 10);
		} else {
			setFadeIn(false);
		}
	}, [isOpen]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		if (isOpen) {
			window.addEventListener("keydown", handleKeyDown);
		}
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) onClose();
	};

	const handleChange = (field: string, value: string) => {
		setEditedData((prev) => ({ ...prev, [field]: value }));
	};

	const formatSalary = (value: string) => {
		if (!value) return "";
		return parseInt(value, 10).toLocaleString("da-DK");
	};

	const handleSave = async () => {
		setIsStatusModalOpen(true);
		setStatusModalState("loading");
		onClose(); // Close EditModal immediately

		try {
			const salaryValue = parseInt(editedData.salary.replace(/\D/g, "")) || 0;

			await updateEmployee(Number(initialData.id), {
				jobTitle: editedData.position,
				experience: parseInt(editedData.experience) || 0,
				gender: editedData.gender,
				companyID: initialData.companyID,
				salary: salaryValue,
			});

			setStatusModalState("success");
			setStatusModalMessage("Employee updated successfully!");

			onSave({
				...editedData,
				salary: salaryValue.toString(), // Convert back to string as expected by `onSave`
			});
		} catch (error) {
			console.error("Failed to save changes:", error);
			setStatusModalState("error");
			setStatusModalMessage("Failed to save changes. Please try again.");
		}
	};

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this employee?")) {
			setIsStatusModalOpen(true);
			setStatusModalState("loading");
			onClose(); // Close EditModal immediately

			try {
				console.log("Deleting employee with ID:", Number(initialData.id));
				await deleteEmployee(Number(initialData.id));
				console.log("Employee deleted successfully");
				setStatusModalState("success");
				setStatusModalMessage("Employee deleted successfully!");
				onDelete();
			} catch (error) {
				console.error("Failed to delete employee:", error);
				setStatusModalState("error");
				setStatusModalMessage("Failed to delete employee. Please try again.");
			}
		}
	};

	if (!isOpen && !isStatusModalOpen) return null;

	return (
		<>
			{isOpen && (
				<div
					className={`fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-xs flex items-center justify-center z-50 transition-opacity duration-300 ${
						fadeIn ? "opacity-100" : "opacity-0"
					}`}
					onClick={handleBackdropClick}
				>
					<div
						className={`bg-white rounded-2xl shadow-xl p-6 w-80 transform transition-all duration-300 border-2 border-black ${
							fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
						}`}
					>
						<h2 className="text-lg font-semibold mb-4 text-center">
							Edit Details
						</h2>

						<Select
							label="Position"
							options={jobTitles}
							selected={editedData.position}
							onChange={(value) => handleChange("position", value)}
							placeholder="Select a job title"
							className="mb-4 w-full"
						/>

						<InputField
							label="Salary"
							placeholder="Enter salary"
							value={formatSalary(editedData.salary)}
							onChange={(e) => {
								let numericValue = e.target.value.replace(/\D/g, "");
								if (numericValue.length > 7) {
									numericValue = numericValue.slice(0, 7);
								}
								handleChange("salary", numericValue);
							}}
							type="text"
							suffix="kr."
						/>

						<Select
							label="Gender"
							options={genderOptions}
							selected={editedData.gender}
							onChange={(value) => handleChange("gender", value)}
							placeholder="Select gender"
							className="mb-4 w-full"
						/>

						<InputField
							label="Experience"
							placeholder="Enter experience"
							value={editedData.experience}
							onChange={(e) => {
								let numericValue = e.target.value.replace(/\D/g, "");
								if (numericValue.length > 2) {
									numericValue = numericValue.slice(0, 2);
								}
								handleChange("experience", numericValue);
							}}
							type="text"
							suffix={editedData.experience === "1" ? "yr." : "yrs."}
						/>

						<div className="flex justify-between mt-4">
							<button
								onClick={onClose}
								className="text-sm text-gray-600 hover:underline"
							>
								Cancel
							</button>
							<button
								onClick={handleSave}
								className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 text-sm"
							>
								Save Changes
							</button>
							<button
								onClick={handleDelete}
								className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}

			<StatusModal
				isOpen={isStatusModalOpen}
				onClose={() => setIsStatusModalOpen(false)}
				status={statusModalState}
				message={statusModalMessage}
			/>
		</>
	);
};

export default EditModal;
