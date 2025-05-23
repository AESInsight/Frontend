import React from "react";
import LoginButton from "../buttons/header_buttons/login_button";
import AdminButton from "../buttons/header_buttons/admin_button";
import InsightButton from "../buttons/header_buttons/Insight_button";
import { useAuth } from "@/lib/context/auth_context";

const Header: React.FC = () => {
	const { isAuthenticated } = useAuth();

	return (
		<header className="fixed overflow-hidden z-20 bg-gradient-to-r from-sky-700 to-sky-400 flex items-center justify-between h-16 w-full border-b-2 border-black">
			<div className="flex items-center space-x-4 flex-grow">
				{/* Logo */}
				<img
					src="/aesinsight.png"
					className="h-10 w-40 md:h-20 md:w-64 object-contain ml-1 cursor-pointer"
					onClick={() => (window.location.href = "/")}
				/>
			</div>

			{/* Buttons on the right */}
			<div className="flex space-x-2 md:space-x-6 mr-2 md:mr-6">
				{isAuthenticated && <AdminButton />}
				<InsightButton />
				<LoginButton />
			</div>
		</header>
	);
};

export default Header;
