// components/InputField.tsx
import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	error,
	className = '',
	...props
}) => {
	return (
		<div className="w-full">
			{label && (
				<label className="block mb-1 text-sm font-medium text-gray-700">
					{label}
				</label>
			)}
			<input
				{...props}
				className={`w-full px-3 py-2 border rounded-md shadow-sm 
					focus:outline-none focus:ring-2 focus:ring-sky-500 
					${error ? 'border-red-500' : 'border-gray-300'} 
					${className}`}
			/>
		</div>
	);
};

export default InputField;
