import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import LoginModal from "../../modals/login_modal";
import StyledHeaderButton from "./styled_header_button";

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
				<StyledHeaderButton
					icon={faSignOut}
					text="Logout"
					onClick={handleLogout}
					className={showLogout ? "visible" : "invisible"}
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
				onLogin={handleLogin}
			/>
		</>
	);
};

export default LoginButton;
