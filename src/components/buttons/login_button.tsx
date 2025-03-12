import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import LoginModal from "../modals/login_modal";

const LoginButton: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [showLogout, setShowLogout] = useState(true);

	const handleLogin = () => {
		setLoggedIn(true);
		setIsOpen(false);
	};

	const handleLogout = () => {
		setShowLogout(false);
		setTimeout(() => {
			setLoggedIn(false);
			setShowLogout(true);
		}, 300);
	};

	return (
		<>
			{loggedIn ? (
				<button
					onClick={handleLogout}
					className={`text-white flex items-center transition-transform duration-300 ease-in-out hover:scale-115 cursor-pointer ${
						showLogout ? "visible" : "invisible"
					}`}
				>
					<FontAwesomeIcon icon={faSignOut} className="mr-2" />
					Logout
				</button>
			) : (
				<button
					onClick={() => setIsOpen(true)}
					className="text-white flex items-center transition-transform duration-300 ease-in-out hover:scale-115 cursor-pointer"
				>
					<FontAwesomeIcon icon={faSignIn} className="mr-2" />
					Login
				</button>
			)}

			<LoginModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onLogin={handleLogin}
			/>
		</>
	);
};

export default LoginButton;
