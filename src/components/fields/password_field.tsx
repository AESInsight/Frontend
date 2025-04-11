import React, { useState } from "react";
import InputField from "./input_field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

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
        { text: "At least one special character", regex: /[~`!@#$%^&*()\-_=+[\]{}|;:'",<.>/?]/ }
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
                        <FontAwesomeIcon 
                            icon={faCircleExclamation} 
                            className="h-5 w-5" 
                        />
                    </button>
                    {showTooltip && (
                        <div className="absolute z-10 w-64 px-4 py-3 text-sm bg-gray-900 text-white rounded-lg shadow-lg -right-2 top-8">
                            <div className="font-medium mb-1">Password Requirements:</div>
                            <ul className="list-disc list-inside">
                                {getValidationStatus().map((req, index) => (
                                    <li key={index} className="text-sm flex items-center">
                                        {req.isValid ? (
                                            <FontAwesomeIcon 
                                                icon={faCheck} 
                                                className="w-4 h-4 mr-2 text-green-500" 
                                            />
                                        ) : (
                                            <FontAwesomeIcon 
                                                icon={faXmark} 
                                                className="w-4 h-4 mr-2 text-red-500" 
                                            />
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