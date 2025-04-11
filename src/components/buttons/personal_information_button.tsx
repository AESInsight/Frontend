import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import InputField from "../fields/input_field";

interface ValidationErrors {
	jobTitle?: string;
	sex?: string;
	salary?: string;
}

const PersonalInformationButton: React.FC<{
	isCollapsed: boolean;
	setIsDropdownOpen: (isOpen: boolean) => void;
}> = ({ isCollapsed, setIsDropdownOpen }) => {
	const [collapsed, setCollapsed] = useState(true);
	const [jobTitle, setJobTitle] = useState("");
	const [sex, setSex] = useState("");
	const [salary, setSalary] = useState("");
	const [status, setStatus] = useState<"idle" | "saved" | "failed">("idle");
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

	const toggleCollapse = () => {
		const newCollapsedState = !collapsed;
		setCollapsed(newCollapsedState);
		setIsDropdownOpen(!newCollapsedState);
	};

	const validateInputs = (): boolean => {
		const errors: ValidationErrors = {};
		let isValid = true;

		// Validate job title
		if (!jobTitle.trim()) {
			errors.jobTitle = "Job title is required";
			isValid = false;
		} else if (!/^[a-zA-Z\s]+$/.test(jobTitle)) {
			errors.jobTitle = "Job title can only contain letters and spaces";
			isValid = false;
		}

		// Validate sex
		const validSex = sex.toLowerCase();
		if (!validSex) {
			errors.sex = "Gender is required";
			isValid = false;
		} else if (validSex !== "male" && validSex !== "female") {
			errors.sex = "Gender must be either 'male' or 'female'";
			isValid = false;
		}

		// Validate salary
		if (!salary.trim()) {
			errors.salary = "Salary is required";
			isValid = false;
		} else if (isNaN(Number(salary)) || Number(salary) <= 0) {
			errors.salary = "Salary must be a positive number";
			isValid = false;
		}

		setValidationErrors(errors);
		return isValid;
	};

	const handleSave = () => {
		if (!validateInputs()) {
			setStatus("failed");
			setTimeout(() => setStatus("idle"), 2000);
			return;
		}

		const personalInfo = { 
			jobTitle, 
			sex: sex.toLowerCase(), 
			salary: Number(salary) 
		};
		localStorage.setItem("personalInfo", JSON.stringify(personalInfo));
		setStatus("saved");
		setTimeout(() => setStatus("idle"), 2000);
	};

	return (
		<div className="w-full">
			<button
				className={`text-black cursor-pointer flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 hover:text-gray-500 hover:bg-gray-100 ${
					isCollapsed ? "justify-center" : "justify-start space-x-4"
				}`}
				onClick={toggleCollapse}
			>
				<FontAwesomeIcon
					icon={faUser}
					className="text-lg transition-all duration-200"
				/>
				<span
					className={`transition-all duration-200 whitespace-nowrap ${
						isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
					}`}
				>
					Personal Info
				</span>
				{!isCollapsed && (
					<FontAwesomeIcon
						icon={faChevronLeft}
						className={`ml-auto transition-transform duration-200 ${
							collapsed ? "rotate-0" : "-rotate-90"
						}`}
					/>
				)}
			</button>
			{!collapsed && (
				<div className="mt-2">
					<div className="mb-2">
						<InputField
							label="Job Title"
							value={jobTitle}
							onChange={(e) => setJobTitle(e.target.value)}
							error={validationErrors.jobTitle}
							className=""
						/>
					</div>
					<div className="mb-2">
						<InputField
							label="Gender"
							value={sex}
							onChange={(e) => setSex(e.target.value)}
							error={validationErrors.sex}
							className=""
						/>
					</div>
					<div className="mb-2">
						<InputField
							label="Salary"
							value={salary}
							onChange={(e) => setSalary(e.target.value)}
							error={validationErrors.salary}
							className=""
						/>
					</div>
					<button
						onClick={handleSave}
						className={`w-full px-4 py-2 rounded-lg transition-all duration-200 ${
							status === "saved"
								? "bg-green-500"
								: status === "failed"
									? "bg-red-500"
									: "bg-sky-600"
						} text-white`}
					>
						{status === "saved"
							? "Saved!"
							: status === "failed"
								? "Failed"
								: "Save"}
					</button>
				</div>
			)}
		</div>
	);
};

export default PersonalInformationButton;
