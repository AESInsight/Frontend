import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../modals/login_modal";

const LoginButton: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { isAuthenticated, logout, companyInfo } = useAuth();

	const handleLogin = () => {
		setIsOpen(false);
	};

	const handleLogout = () => {
		logout();
	};

	return (
		<>
			{isAuthenticated ? (
				<div className="flex items-center">
					<span className="text-white mr-4">{companyInfo?.CompanyName}</span>
					<button
						onClick={handleLogout}
						className="text-white flex items-center transition-transform duration-300 ease-in-out hover:scale-115 cursor-pointer"
					>
						<FontAwesomeIcon icon={faSignOut} className="mr-2" />
						Logout
					</button>
				</div>
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
