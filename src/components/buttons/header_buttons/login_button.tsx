import React, { useState } from "react";
import LoginModal from "../../modals/login_modal";
import StyledHeaderButton from "./styled_header_button";
import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";

const LoginButton: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	const handleLoginSuccess = (jwtToken: string) => {
		setLoggedIn(true);
		localStorage.setItem("authToken", jwtToken); // Store the token in localStorage
	};

	const handleLogout = () => {
		setLoggedIn(false);
		localStorage.removeItem("authToken"); // Remove the token from localStorage
	};

	return (
		<>
			{loggedIn ? (
				<StyledHeaderButton
					icon={faSignOut}
					text="Logout"
					onClick={handleLogout}
				/>
			) : (
				<StyledHeaderButton
					icon={faSignIn}
					text="Login"
					onClick={() => setIsOpen(true)}
				/>
			)}
			<LoginModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onLoginSuccess={handleLoginSuccess}
			/>
		</>
	);
};

export default LoginButton;
