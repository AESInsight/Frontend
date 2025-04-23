import React, { useEffect, useState } from "react";
import InputField from "../fields/input_field";
import PasswordField from "../fields/password_field";
import axios from "axios";
import { validateEmail, validatePassword } from "@/lib/regexValidationLogin";

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
		email?: string;
		password?: string;
	}>({});
	const [isSubmitted, setIsSubmitted] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => setFadeIn(true), 10);
		} else {
			setFadeIn(false);
		}
	}, [isOpen]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		if (isOpen) {
			window.addEventListener("keydown", handleKeyDown);
		}
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) onClose();
	};

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setUsername(value);
		if (isSubmitted) {
			if (value && !validateEmail(value)) {
				setValidationErrors(prev => ({
					...prev,
					email: 'Please enter a valid email address'
				}));
			} else {
				setValidationErrors(prev => ({
					...prev,
					email: undefined
				}));
			}
		}
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
		if (isSubmitted) {
			const { errors } = validatePassword(value);
			setValidationErrors(prev => ({
				...prev,
				password: errors.length > 0 ? errors[0] : undefined
			}));
		}
	};

	const handleLogin = async () => {
		setIsSubmitted(true);
		setError("");

		// Validate email
		if (!validateEmail(username)) {
			setValidationErrors(prev => ({
				...prev,
				email: 'Please enter a valid email address'
			}));
			return;
		}

		// Validate password
		const passwordValidation = validatePassword(password);
		if (!passwordValidation.isValid) {
			setValidationErrors(prev => ({
				...prev,
				password: passwordValidation.errors[0]
			}));
			return;
		}

		try {
			const response = await axios.post(
				"http://localhost:5170/api/auth/login",
				{
					username,
					password,
				}
			);
			onLoginSuccess(response.data.Token);
			onClose();
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError(
					err.response?.data?.message || "Login failed. Please try again."
				);
			} else {
				setError("An unexpected error occurred.");
			}
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
					label="Email"
					placeholder="Enter your email"
					value={username}
					onChange={handleUsernameChange}
					error={isSubmitted ? validationErrors.email : undefined}
				/>

				<PasswordField
					value={password}
					onChange={handlePasswordChange}
					error={validationErrors.password}
					showValidation={isSubmitted}
				/>

				<div className="flex justify-between mt-4">
					<button
						onClick={onClose}
						className="text-sm text-gray-600 hover:underline"
					>
						Cancel
					</button>
					<button
						onClick={handleLogin}
						className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 text-sm"
					>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginModal;
