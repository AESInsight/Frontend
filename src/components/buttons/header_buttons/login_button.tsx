import React, { useState } from "react";
import LoginModal from "../../modals/login_modal";
import StyledHeaderButton from "./styled_header_button";
import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/lib/context/auth_context";

const LoginButton: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { isAuthenticated, login, logout } = useAuth();

	const handleLoginSuccess = (jwtToken: string) => {
		login(jwtToken);
		setIsOpen(false);
	};

	return (
		<>
			{isAuthenticated ? (
				<StyledHeaderButton icon={faSignOut} text="Logout" onClick={logout} />
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
