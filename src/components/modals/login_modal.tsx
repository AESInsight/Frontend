import React, { useEffect, useState } from "react";
import InputField from "../fields/input_field";
import axios from "axios";
import ResetPasswordModal from "./resetpassword_modal";
import { validateEmail } from "@/lib/regexValidationLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { postLogin, postReset } from "@/lib/loginAPI";
import { Eye, EyeOff } from "lucide-react";

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
	const [validationErrors, setValidationErrors] = useState<{
		email?: string; }>({});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

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
		setValidationErrors({});
		setIsSubmitted(false);
	};

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => setFadeIn(true), 10);
		} else {
			setFadeIn(false);
			resetLoginState();
		}
	}, [isOpen]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				resetLoginState();
				onClose();
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
			resetLoginState();
			onClose();
		}
	};

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setUsername(value);
		if (isSubmitted) {
			if (value && !validateEmail(value)) {
				setValidationErrors((prev) => ({
					...prev,
					email: "Please enter a valid email address",
				}));
			} else {
				setValidationErrors((prev) => ({
					...prev,
					email: undefined,
				}));
			}
		}
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
	};

	const handleLogin = async () => {
		setIsSubmitted(true);
		setError("");
		setIsLoggingIn(true);

		// Validate email
		if (!validateEmail(username)) {
			setValidationErrors((prev) => ({
				...prev,
				email: "Please enter a valid email address",
			}));
			setIsLoggingIn(false);
			return;
		}

		try {
			const response = await postLogin(username, password);
			onLoginSuccess(response.Token);
			onClose();
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError(
					err.response?.data?.message || "Login failed. Please try again."
				);
			} else {
				setError("An unexpected error occurred.");
			}
		} finally {
			setIsLoggingIn(false);
		}
	};

	const handlePasswordReset = async () => {
		if (!resetEmail) {
			setResetMessage("Please enter your email address.");
			setIsResetError(true);
			return;
		}

		setIsSending(true);
		try {
			const response = await postReset(resetEmail);
			setResetMessage(response.message || "Password reset email sent.");
			setIsResetError(false);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setResetMessage(
					err.response?.data?.message || "Failed to send reset email."
				);
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
				<button
					onClick={() => {
						resetLoginState();
						onClose();
					}}
					className="absolute top-3 left-3 text-gray-400 hover:text-black text-xl font-bold focus:outline-none hover:cursor-pointer"
					aria-label="Close modal"
				>
					<FontAwesomeIcon icon={faTimes} size="sm" />
				</button>

				<h2 className="text-lg font-semibold mb-4 text-center">Login</h2>
				{error && <p className="text-red-500 text-sm mb-4">{error}</p>}

				<InputField
					label="Email"
					placeholder="Enter your email"
					value={username}
					onChange={handleUsernameChange}
					error={isSubmitted ? validationErrors.email : undefined}
				/>

				<div className="relative mb-4">
					<input
						type={showPassword ? "text" : "password"}
						placeholder="Enter your password"
						value={password}
						onChange={handlePasswordChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-sky-500"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
					>
						{showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
					</button>
				</div>

				<button
					onClick={handleLogin}
					disabled={isLoggingIn}
					className={`w-full mt-2 bg-sky-600 text-white px-4 py-2 rounded-lg text-sm ${
						isLoggingIn
							? "opacity-50 cursor-not-allowed"
							: "hover:bg-sky-700 hover:underline hover:cursor-pointer"
					}`}
				>
					{isLoggingIn ? "Logging in..." : "Login"}
				</button>

				<div className="flex justify-center mt-4">
					<button
						onClick={() => setShowResetModal(true)}
						className="text-xs text-sky-600 hover:underline hover:cursor-pointer"
					>
						Forgot Password?
					</button>
				</div>
			</div>

			<ResetPasswordModal
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
