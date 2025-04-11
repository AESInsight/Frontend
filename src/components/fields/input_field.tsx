// components/InputField.tsx
import React from "react";

interface InputFieldProps {
	label?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	type?: string;
	suffix?: string;
	maxLength?: number;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	placeholder,
	value,
	onChange,
	className = "",
	type = "text",
	suffix,
	maxLength,
}) => {
	return (
		<div className="mb-4">
			{label && (
				<label className="block mb-1 text-sm text-gray-700">{label}</label>
			)}
			<div className="flex">
				<input
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					maxLength={maxLength}
					className={`px-3 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-sky-500 ${suffix ? "rounded-l-lg" : "rounded-lg"} w-full ${className}`}
				/>
				{suffix && (
					<span className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-lg flex items-center">
						{suffix}
					</span>
				)}
			</div>			
		</div>
	);
};

export default InputField;
