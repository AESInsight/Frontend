import React, { useEffect, useState } from "react";
import InputField from "../fields/input_field";

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
	isOpen,
	onClose,
	onLogin,
}) => {
	const [fadeIn, setFadeIn] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

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
				/>

				<div className="flex justify-between mt-4">
					<button
						onClick={onClose}
						className="text-sm text-gray-600 hover:underline"
					>
						Cancel
					</button>
					<button
						onClick={onLogin}
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
