// components/InputField.tsx
import React from "react";

interface InputFieldProps {
	label?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	placeholder,
	value,
	onChange,
	className = "",
}) => {
	return (
		<div className="mb-4">
			{label && (
				<label className="block mb-1 text-sm text-gray-700">{label}</label>
			)}
			<input
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-sky-500 ${className}`}
			/>
		</div>
	);
};

export default InputField;
