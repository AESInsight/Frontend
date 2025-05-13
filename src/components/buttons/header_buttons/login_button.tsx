import React, { useState } from "react";
import LoginModal from "../../modals/login_modal";
import StyledHeaderButton from "./styled_header_button";
import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/lib/context/auth_context";

const LoginButton: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { isAuthenticated, login, logout } = useAuth();

	const handleLoginSuccess = (jwtToken: string, companyId: number | null) => {
		console.log('Login success in button:', { jwtToken, companyId });
		login(jwtToken);
		setIsOpen(false);
	};

	const handleLogout = () => {
		console.log('Logging out...');
		localStorage.removeItem('authToken');
		localStorage.removeItem('companyId');
		logout();
	};

	return (
		<>
			{isAuthenticated ? (
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
