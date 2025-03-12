import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import InputField from "../fields/input_field";

const PersonalInformationButton: React.FC<{
	isCollapsed: boolean;
	setIsDropdownOpen: (isOpen: boolean) => void;
}> = ({ isCollapsed, setIsDropdownOpen }) => {
	const [collapsed, setCollapsed] = useState(true);
	const [jobTitle, setJobTitle] = useState("");
	const [sex, setSex] = useState("");
	const [salary, setSalary] = useState("");
	const [status, setStatus] = useState<"idle" | "saved" | "failed">("idle");

	const toggleCollapse = () => {
		const newCollapsedState = !collapsed;
		setCollapsed(newCollapsedState);
		setIsDropdownOpen(!newCollapsedState);
	};

	const handleSave = () => {
		// Validate inputs
		if (
			!jobTitle ||
			typeof jobTitle !== "string" ||
			!sex ||
			typeof sex !== "string" ||
			!salary ||
			isNaN(Number(salary))
		) {
			setStatus("failed");
			setTimeout(() => setStatus("idle"), 2000);
			return;
		}

		const personalInfo = { jobTitle, sex, salary };
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
							className=""
						/>
					</div>
					<div className="mb-2">
						<InputField
							label="Sex"
							value={sex}
							onChange={(e) => setSex(e.target.value)}
							className=""
						/>
					</div>
					<div className="mb-2">
						<InputField
							label="Salary"
							value={salary}
							onChange={(e) => setSalary(e.target.value)}
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
