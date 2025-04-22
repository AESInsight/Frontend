import React, { useEffect, useState } from "react";
import InputField from "../fields/input_field";
import axios from "axios";
import ResetPasswordModalProps from "./resetpassword_modal";

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	onLoginSuccess: (token: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
	isOpen,
	onClose,
	onLoginSuccess,
}) => {
	const [fadeIn, setFadeIn] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	const [showResetModal, setShowResetModal] = useState(false);
	const [resetEmail, setResetEmail] = useState("");
	const [resetMessage, setResetMessage] = useState("");
	const [isResetError, setIsResetError] = useState(false);
	const [isSending, setIsSending] = useState(false);

	const resetLoginState = () => {
		setUsername("");
		setPassword("");
		setError("");
		setIsLoggingIn(false);
	};

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => setFadeIn(true), 10);
		} else {
			setFadeIn(false);
			resetLoginState(); // Reset state when modal closes
		}
	}, [isOpen]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				resetLoginState(); // Reset state when modal closes
				onClose(); // Close the modal
			}
		};
		if (isOpen) {
			window.addEventListener("keydown", handleKeyDown);
		}
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			resetLoginState(); // Reset state when modal closes
			onClose(); // Close the modal
		}
	};

	const handleLogin = async () => {
		setIsLoggingIn(true);
		setError(""); // Clear previous error message

		try {
			const response = await axios.post(
				"http://localhost:5170/api/Auth/login",
				{
					username,
					password,
				}
			);
			onLoginSuccess(response.data.Token); // Pass the token to the parent component
			onClose(); // Close the modal
		} catch (err) {
			if (axios.isAxiosError(err)) {
				// Narrow the type to AxiosError
				setError(err.response?.data?.message || "Login failed. Please try again.");
			} else {
				// Handle unexpected errors
				setError("An unexpected error occurred.");
			}
		} finally {
			setIsLoggingIn(false);
		}
	};

	const handlePasswordReset = async () => {
		if(!resetEmail) {
			setResetMessage("Please enter your email address.");
			setIsResetError(true);
			return;
		}

		setIsSending(true);
		try {
			const response = await axios.post(
				"http://localhost:5170/api/PasswordReset/request-reset",
				{ email: resetEmail }
			);
			setResetMessage(response.data.message || "Password reset email sent.");	
			setIsResetError(false);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setResetMessage(err.response?.data?.message || "Failed to send reset email.");
			} else {
				setResetMessage("An unexpected error occurred.");
			}
			setIsResetError(true);

		} finally {
			setIsSending(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div
			className={`fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-xs flex items-center justify-center z-50 transition-opacity duration-300 ${
				fadeIn ? "opacity-100" : "opacity-0"
			}`}
			onClick={handleBackdropClick}
		>
			<div
				className={`bg-white rounded-2xl shadow-xl p-6 w-80 transform transition-all duration-300 border-2 border-black ${
					fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
				}`}
			>
				<h2 className="text-lg font-semibold mb-4 text-center">Login</h2>
				{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
				<InputField
					label="Username"
					placeholder="Enter your username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>

				<InputField
					label="Password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
				/>

				<div className="flex justify-between mt-4">
					<button
						onClick={() => {
							resetLoginState(); // Reset state when modal closes
							onClose(); // Close the modal
						}}
						className="text-sm text-gray-600 hover:underline"
					>
						Cancel
					</button>
					<button
						onClick={handleLogin}
						disabled={isLoggingIn}
						className={`bg-sky-600 text-white px-4 py-2 rounded-lg text-sm ${
							isLoggingIn ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-700"
						}`}
					>
						{isLoggingIn ? "Logging in..." : "Login"}
					</button>
				</div>

				<div className="flex justify-center mt-4">
					<button
						onClick={() => setShowResetModal(true)}
						className="text-xs text-sky-600 hover:underline"
					>
						Forgot Password?
					</button>
				</div>
			</div>

			{/* Reset Password Modal */}
			<ResetPasswordModalProps
				isOpen={showResetModal}
				onClose={() => {
					setShowResetModal(false);
					setResetEmail("");
					setResetMessage("");
					setIsResetError(false);
					setIsSending(false);
				}}
				email={resetEmail}
				onEmailChange={(e) => setResetEmail(e.target.value)}
				onReset={handlePasswordReset}
				message={resetMessage}
				isError={isResetError}
				isSending={isSending}
			/>
		</div>
	);
};

export default LoginModal;
