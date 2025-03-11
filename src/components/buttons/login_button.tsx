import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import InputField from "../fields/input_field";

const LoginButton: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [fadeIn, setFadeIn] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);
	const [showLogout, setShowLogout] = useState(true); // handles delayed disappearance

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => setFadeIn(true), 10);
		} else {
			setFadeIn(false);
		}
	}, [isOpen]);

	const handleLogin = () => {
		//placeholder logic
		setLoggedIn(true);
		setIsOpen(false);
	};

	const handleLogout = () => {
		// Start fade-out effect
		//placeholder logic
		setShowLogout(false);

		// After transition, update login state
		setTimeout(() => {
			setLoggedIn(false);
			setShowLogout(true); // reset for next time
		}, 300); // match transition duration
	};

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setIsOpen(false);
		}
	};

	return (
		<>
			{loggedIn ? (
				<button
					onClick={handleLogout}
					className={`text-white flex items-center transition-transform duration-300 ease-in-out hover:scale-115 ${
						showLogout ? "visible" : "invisible"
					}`}
				>
					<FontAwesomeIcon icon={faSignOut} className="mr-2" />
					Logout
				</button>
			) : (
				<button
					onClick={() => setIsOpen(true)}
					className="text-white flex items-center transition-transform duration-300 ease-in-out hover:scale-115"
				>
					<FontAwesomeIcon icon={faSignIn} className="mr-2" />
					Login
				</button>
			)}

			{isOpen && (
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
								onClick={() => setIsOpen(false)}
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
			)}
		</>
	);
};

export default LoginButton;
