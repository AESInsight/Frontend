import React, { useEffect, useState } from "react";
import InputField from "../fields/input_field";
import { addEmployee, fetchJobTitles } from "../../lib/employeeAPI";
import { Select } from "../ui/select";
import StatusModal from "./status_modal";
import { getCompanyId } from "@/lib/utils";

interface AddEmployeeModalProps {
	isOpen: boolean;
	onClose: () => void;
	onEmployeeAdded?: () => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
	isOpen,
	onClose,
	onEmployeeAdded,
}) => {
	const [fadeIn, setFadeIn] = useState(false);
	const [jobTitles, setJobTitles] = useState<string[]>([]);
	const genderOptions = ["Male", "Female"];
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [statusModalState, setStatusModalState] = useState<
		"loading" | "success" | "error"
	>("loading");
	const [statusModalMessage, setStatusModalMessage] = useState<
		string | undefined
	>(undefined);
	const companyId = getCompanyId();

	const [newEmployeeData, setNewEmployeeData] = useState({
		position: "",
		salary: "",
		gender: "",
		experience: "",
		companyID: companyId,
	});

	useEffect(() => {
		const loadJobTitles = async () => {
			try {
				const response = await fetchJobTitles();
				setJobTitles(response.jobTitles || []);
			} catch {
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
		setNewEmployeeData((prev) => ({ ...prev, [field]: value }));
	};

	const handleAddEmployee = async () => {
		setIsStatusModalOpen(true);
		onClose();
		setStatusModalState("loading");

		try {
			const experienceValue = parseInt(newEmployeeData.experience) || 0;
			const salaryValue =
				parseInt(newEmployeeData.salary.replace(/\D/g, "")) || 0;

			if (!newEmployeeData.position) {
				throw new Error("Please select a job title");
			}
			if (!newEmployeeData.gender) {
				throw new Error("Please select a gender");
			}
			if (experienceValue <= 0) {
				throw new Error("Experience must be a positive number");
			}
			if (salaryValue <= 0) {
				throw new Error("Salary must be a positive number");
			}
			if (!companyId) {
				throw new Error("Company ID is missing");
			}

			const employeeData = {
				jobTitle: newEmployeeData.position.trim() || "Software Developer",
				experience: experienceValue,
				gender: newEmployeeData.gender,
				salary: salaryValue,
				companyId: companyId,
			};

			await addEmployee(employeeData);

			setStatusModalState("success");
			setStatusModalMessage("Employee and salary added successfully!");

			setNewEmployeeData({
				position: "",
				salary: "",
				gender: "",
				experience: "",
				companyID: companyId,
			});

			onEmployeeAdded?.();

			// Refresh the page after a short delay to show the success message
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} catch (error) {
			setStatusModalState("error");
			setStatusModalMessage(
				error instanceof Error
					? error.message
					: "Failed to add employee. Please try again."
			);
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
					role="dialog"
					aria-modal="true"
				>
					<div
						className={`bg-white rounded-2xl shadow-xl p-6 w-80 transform transition-all duration-300 border-2 border-black ${
							fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
						}`}
					>
						<h2 className="text-lg font-semibold mb-4 text-center">
							Add Employee
						</h2>

						<Select
							label="Position"
							options={jobTitles}
							selected={newEmployeeData.position}
							onChange={(value) => handleChange("position", value)}
							placeholder="Select a job title"
							className="mb-4 w-full"
						/>

						<InputField
							label="Salary"
							placeholder="Enter salary"
							value={newEmployeeData.salary}
							onChange={(e) => handleChange("salary", e.target.value)}
							type="text"
							suffix="kr."
						/>

						<Select
							label="Gender"
							options={genderOptions}
							selected={newEmployeeData.gender}
							onChange={(value) => handleChange("gender", value)}
							placeholder="Select gender"
							className="mb-4 w-full"
						/>

						<InputField
							label="Experience"
							placeholder="Enter experience"
							value={newEmployeeData.experience}
							onChange={(e) => handleChange("experience", e.target.value)}
							type="text"
							suffix="yrs."
						/>

						<div className="flex justify-between mt-4">
							<button
								onClick={onClose}
								className="text-sm text-gray-600 hover:underline"
							>
								Cancel
							</button>
							<button
								onClick={handleAddEmployee}
								className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 text-sm"
							>
								Add Employee
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

export default AddEmployeeModal;
