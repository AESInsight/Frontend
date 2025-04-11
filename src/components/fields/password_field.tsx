import React, { useState } from "react";
import InputField from "./input_field";

interface PasswordFieldProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    error?: string;
    showValidation?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
    label = "Password",
    placeholder = "Enter your password",
    value,
    onChange,
    className = "",
    error,
    showValidation = false,
}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const passwordRequirements = [
        { text: "Minimum 8 characters long", regex: /.{8,}/ },
        { text: "At least one uppercase letter", regex: /[A-Z]/ },
        { text: "At least one number", regex: /\d/ },
        { text: "At least one special character", regex: /[~`!@#$%^&*()\-_=+\[\]{}|;:'",<.>/?]/ }
    ];

    const getValidationStatus = () => {
        return passwordRequirements.map(req => ({
            text: req.text,
            isValid: req.regex.test(value)
        }));
    };

    // Determine if the password is invalid (after submission)
    const isInvalid = showValidation && error !== undefined;
    

    return (
        <div className="relative">
            <div className="flex items-center justify-between">
                {label && (
                    <label className="block mb-1 text-sm text-gray-700">{label}</label>
                )}
                <div className="relative inline-block">
                    <button
                        type="button"
                        className={`focus:outline-none ${
                            isInvalid ? 'text-red-500 hover:text-red-700' : 'text-gray-700 hover:text-gray-900'
                        }`}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                        >
                            <path 
                                fillRule="evenodd" 
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                                clipRule="evenodd" 
                            />
                        </svg>
                    </button>
                    {showTooltip && (
                        <div className="absolute z-10 w-64 px-4 py-3 text-sm bg-gray-900 text-white rounded-lg shadow-lg -right-2 top-8">
                            <div className="font-medium mb-1">Password Requirements:</div>
                            <ul className="list-disc list-inside">
                                {getValidationStatus().map((req, index) => (
                                    <li key={index} className="text-sm flex items-center">
                                        {req.isValid ? (
                                            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        )}
                                        {req.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <InputField
                type="password"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                error={undefined} // Never show error text
                className={`${className} ${isInvalid ? 'border-red-500 focus:ring-red-200' : ''}`}
            />
        </div>
    );
};

export default PasswordField; 