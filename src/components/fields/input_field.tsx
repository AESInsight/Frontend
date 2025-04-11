// components/InputField.tsx
import React from "react";

interface InputFieldProps {
	label?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	type?: string;
	error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	placeholder,
	value,
	onChange,
	className = "",
	type = "text",
	error,
}) => {
	return (
		<div className="mb-4">
			{label && (
				<label className="block mb-1 text-sm text-gray-700">{label}</label>
			)}
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${
					error 
						? 'border-red-500 focus:ring-red-200' 
						: 'border-gray-300 focus:ring-sky-200'
				} ${className}`}
			/>
			{error && (
				<p className="mt-1 text-sm text-red-500">{error}</p>
			)}
		</div>
	);
};

export default InputField;
