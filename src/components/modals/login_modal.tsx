import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import InputField from '../fields/input_field';
import { useAuth } from '../../context/AuthContext';
import PasswordResetModal from './password_reset_modal';

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	onLogin: () => void;
}

interface ValidationErrors {
	email?: string;
	password?: string;
	general?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
	const [fadeIn, setFadeIn] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth();
	const [showResetModal, setShowResetModal] = useState(false);

	// Email regex pattern
	const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => setFadeIn(true), 10);
		} else {
			setFadeIn(false);
			// Clear form when modal closes
			setEmail('');
			setPassword('');
			setErrors({});
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

	const validateForm = (): boolean => {
		const newErrors: ValidationErrors = {};
		let isValid = true;

		// Email validation
		if (!email) {
			newErrors.email = 'Email is required';
			isValid = false;
		} else if (!EMAIL_REGEX.test(email)) {
			newErrors.email = 'Please enter a valid email address';
			isValid = false;
		}

		// Password validation
		if (!password) {
			newErrors.password = 'Password is required';
			isValid = false;
		} else if (password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async () => {
		if (!validateForm()) return;

		setIsLoading(true);
		setErrors({});

		try {
			const result = await login({ email, password });
			if (result) {
				onLogin();
				onClose();
			} else {
				setErrors({
					general: 'Invalid email or password'
				});
			}
		} catch (error: any) {
			let errorMessage = 'An error occurred during login';
			
			// Handle specific API errors
			if (error.response) {
				switch (error.response.status) {
					case 400:
						errorMessage = 'Invalid credentials';
						break;
					case 401:
						errorMessage = 'Unauthorized access';
						break;
					case 403:
						errorMessage = 'Account locked. Please contact support';
						break;
					case 429:
						errorMessage = 'Too many login attempts. Please try again later';
						break;
					case 500:
						errorMessage = 'Server error. Please try again later';
						break;
				}
			}
			
			setErrors({
				general: errorMessage
			});
		} finally {
			setIsLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<>
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
					<h2 className="text-lg font-semibold mb-4 text-center">Company Login</h2>

					{errors.general && (
						<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
							<div className="flex items-center text-red-600">
								<FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
								<span>{errors.general}</span>
							</div>
						</div>
					)}

					<div className="space-y-4">
						<div>
							<InputField
								label="Email"
								type="email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									setErrors((prev) => ({ ...prev, email: undefined }));
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter' && !isLoading) {
										handleSubmit();
									} else if (e.key === 'Escape') {
										onClose();
									}
								}}
								error={errors.email}
								disabled={isLoading}
								placeholder="Enter your email"
								className={errors.email ? 'border-red-500' : ''}
							/>
							{errors.email && (
								<p className="mt-1 text-sm text-red-600">{errors.email}</p>
							)}
						</div>

						<div>
							<InputField
								label="Password"
								type="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									setErrors((prev) => ({ ...prev, password: undefined }));
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter' && !isLoading) {
										handleSubmit();
									} else if (e.key === 'Escape') {
										onClose();
									}
								}}
								error={errors.password}
								disabled={isLoading}
								placeholder="Enter your password"
								className={errors.password ? 'border-red-500' : ''}
							/>
							{errors.password && (
								<p className="mt-1 text-sm text-red-600">{errors.password}</p>
							)}
						</div>
					</div>

					<div className="mt-2 text-center">
						<button
							onClick={() => setShowResetModal(true)}
							className="text-sm text-sky-600 hover:text-sky-700"
						>
							Forgot Password?
						</button>
					</div>

					<div className="flex justify-between mt-4">
						<button
							onClick={onClose}
							className="text-sm text-gray-600 hover:underline"
						>
							Cancel
						</button>
						<button
							onClick={handleSubmit}
							className={`bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 text-sm ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
						>
							{isLoading ? 'Logging in...' : 'Login'}
						</button>
					</div>
				</div>
			</div>

			<PasswordResetModal
				isOpen={showResetModal}
				onClose={() => setShowResetModal(false)}
			/>
		</>
	);
};

export default LoginModal;
