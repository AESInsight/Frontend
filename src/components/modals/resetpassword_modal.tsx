import React from "react";
import InputField from "../fields/input_field";

interface ResetPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onReset: () => void;
    message: string;
    isError: boolean;
    isSending: boolean;
}

const ResetPasswordModalProps: React.FC<ResetPasswordModalProps> = ({
    isOpen,
    onClose,
    email,
    onEmailChange,
    onReset,
    message,
    isError,
    isSending,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-xs flex items-center justify-center z-60"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-white p-6 rounded-2xl shadow-xl w-80 border-2 border-black">
                <h2 className="text-lg font-semibold mb-4 text-center">
                    Reset Password
                </h2>
                {message && (
                    <p
                        className={`text-sm text-center mb-4 ${
                            isError ? "text-red-600" : "text-green-600"
                        }`}
                    >
                        {message}
                    </p>
                )}
                <InputField
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={onEmailChange}
                />
                <div className="flex justify-between mt-4">
                    <button
                        onClick={onClose}
                        className="text-sm text-gray-600 hover:underline"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onReset}
                        disabled={isSending}
                        className={`bg-sky-600 text-white px-4 py-2 rounded-lg text-sm ${
                            isSending ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-700"
                        }`}
                    >
                        {isSending ? "Sending..." : "Send Email"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordModalProps;