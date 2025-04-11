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
  error?: string;
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
  error,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm text-gray-700">{label}</label>
      )}

      <div className={`flex ${error ? "flex-col" : ""}`}>
        <div className="flex w-full">
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            className={`px-3 py-2 border focus:outline-none focus:ring ${
              error
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-sky-200"
            } ${suffix ? "rounded-l-lg" : "rounded-lg"} w-full ${className}`}
          />
          {suffix && (
            <span className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-lg flex items-center">
              {suffix}
            </span>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default InputField;
