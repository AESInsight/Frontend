import React, { useEffect, useState } from "react";
import InputField from "../fields/input_field";
import PasswordField from "../fields/password_field";
import axios from "axios";
import ResetPasswordModal from "./resetpassword_modal";
import { validateEmail } from "@/lib/regexValidationLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { postLogin, postReset } from "@/lib/loginAPI";
import { useAuth } from "@/lib/context/auth_context";

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	onLoginSuccess: (jwtToken: string, companyId: number | null) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
	isOpen,
	onClose,
	onLoginSuccess,
}) => {
	const { login } = useAuth();
	const [fadeIn, setFadeIn] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [validationErrors, setValidationErrors] = useState<{ email?: string }>(
		{}
	);
	const [isSubmitted, setIsSubmitted] = useState(false);
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
			setValidationErrors((prev) => ({
				...prev,
				email: !validateEmail(value)
					? "Please enter a valid email address"
					: undefined,
			}));
		}
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleLogin = async () => {
		setIsSubmitted(true);
		setError("");
		setIsLoggingIn(true);

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
			console.log('Full login response:', response);

			// Store the token
			localStorage.setItem("authToken", response.token);
			
			// Store the company ID if it exists
			if (response.companyID) {
				console.log('Storing company ID:', response.companyID);
				localStorage.setItem("companyId", response.companyID.toString());
			} else {
				console.log('No company ID in response');
			}

			login(response.token);
			onLoginSuccess(response.token, response.companyID);
			onClose();
		} catch (err) {
			console.error('Login error:', err);
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

				<PasswordField
					value={password}
					onChange={handlePasswordChange}
					showValidation={false}
					showInfoIcon={false}
				/>

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
