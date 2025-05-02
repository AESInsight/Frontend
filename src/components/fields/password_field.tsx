import React, { useState } from "react";
import InputField from "./input_field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
	label?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	error?: string;
	showValidation?: boolean;
	showInfoIcon?: boolean; // 👈 NY
}

const PasswordField: React.FC<PasswordFieldProps> = ({
	label = "Password",
	placeholder = "Enter your password",
	value,
	onChange,
	className = "",
	error,
	showValidation = false,
	showInfoIcon = true, // 👈 NY default
}) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const passwordRequirements = [
		{ text: "Minimum 8 characters long", regex: /.{8,}/ },
		{ text: "At least one uppercase letter", regex: /[A-Z]/ },
		{ text: "At least one number", regex: /\d/ },
		{ text: "At least one special character", regex: /[~`!@#$%^&*()\-_=+[\]{}|;:'",<.>/?]/ },
	];

	const getValidationStatus = () => {
		return passwordRequirements.map(req => ({
			text: req.text,
			isValid: req.regex.test(value),
		}));
	};

	const isInvalid = showValidation && error !== undefined;

	return (
		<div className="relative">
			<div className="flex items-center justify-between">
				{label && (
					<label className="block mb-1 text-sm text-gray-700">{label}</label>
				)}
				{showInfoIcon && (
					<div className="relative inline-block">
						<button
							type="button"
							className={`focus:outline-none ${
								isInvalid ? 'text-red-500 hover:text-red-700' : 'text-gray-700 hover:text-gray-900'
							}`}
							onMouseEnter={() => setShowTooltip(true)}
							onMouseLeave={() => setShowTooltip(false)}
						>
							<FontAwesomeIcon icon={faCircleExclamation} className="h-5 w-5" />
						</button>
						{showTooltip && (
							<div className="absolute z-10 w-64 px-4 py-3 text-sm bg-gray-900 text-white rounded-lg shadow-lg -right-2 top-8">
								<div className="font-medium mb-1">Password Requirements:</div>
								<ul className="list-disc list-inside">
									{getValidationStatus().map((req, index) => (
										<li key={index} className="text-sm flex items-center">
											<FontAwesomeIcon
												icon={req.isValid ? faCheck : faXmark}
												className={`w-4 h-4 mr-2 ${req.isValid ? "text-green-500" : "text-red-500"}`}
											/>
											{req.text}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				)}
			</div>

			{/* Input + øje ikon */}
			<div className="relative">
				<InputField
					type={showPassword ? "text" : "password"}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					error={undefined}
					className={`${className} pr-10 ${
						isInvalid ? "border-red-500 focus:ring-red-200" : ""
					}`}
				/>
				<button
					type="button"
					onClick={() => setShowPassword(!showPassword)}
					className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
				>
					{showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
				</button>
			</div>
		</div>
	);
};

export default PasswordField;
