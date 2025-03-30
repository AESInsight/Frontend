import React from "react";
import LoginButton from "../buttons/login_button";
import AdminButton from "../buttons/admin_button";
import InsightButton from "../buttons/Insight_button";

const Header: React.FC = () => {
	return (
		<header className="bg-gradient-to-r from-sky-700 to-sky-400 flex items-center justify-between h-16 w-full border-b-2 border-black">
			{/* Logo */}
			<img
				src="/aesinsight.png"
				className="h-20 w-64 object-contain ml-1 cursor-pointer"
				onClick={() => (window.location.href = "/")}
			/>
			{/* Buttons on the right */}
			<div className="flex space-x-6 mr-6">
				<AdminButton />
				<InsightButton />
				<LoginButton />
			</div>
		</header>
	);
};

export default Header;
