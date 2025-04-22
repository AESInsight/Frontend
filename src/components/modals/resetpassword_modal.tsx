import React from "react";
import InputField from "../fields/input_field";

interface ResetPasswordModal {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onReset: () => void;
    message: string;
    isError: boolean;
    isSending: boolean;
}

const ResetPasswordModal: React.FC<ResetPasswordModal> = ({
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
            <div className="relative bg-white p-6 rounded-2xl shadow-xl w-80 border-2 border-black">
				{/* X-Knap */}
				<button
					onClick={onClose}
					className="absolute top-3 left-3 text-gray-400 hover:text-black text-xl font-bold focus:outline-none hover:cursor-pointer"
					aria-label="Close reset modal"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
            {/*</div><div className="bg-white p-6 rounded-2xl shadow-xl w-80 border-2 border-black">*/}
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
                <div className="flex justify-center mt-4">
                    <button
                        onClick={onReset}
                        disabled={isSending}
                        className={`w-full bg-sky-600 text-white px-4 py-2 rounded-lg text-sm ${
                            isSending ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-700 hover:underline hover:cursor-pointer"
                        }`}
                    >
                        {isSending ? "Sending..." : "Send Email"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordModal;