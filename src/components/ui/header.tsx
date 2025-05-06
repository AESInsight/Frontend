import React from "react";

import LoginButton from "../buttons/header_buttons/login_button";
import AdminButton from "../buttons/header_buttons/admin_button";
import InsightButton from "../buttons/header_buttons/Insight_button";
import SearchBar from "./search_bar";

const Header: React.FC = () => {
	return (
		<header className="fixed overflow-hidden z-20 bg-gradient-to-r from-sky-700 to-sky-400 flex items-center justify-between h-16 w-full border-b-2 border-black" data-testid="header">
			<div className="flex items-center space-x-4 flex-grow" data-testid="header-left">
				{/* Logo */}
				<img
					src="/aesinsight.png"
					className="h-20 w-64 object-contain ml-1 cursor-pointer"
					onClick={() => (window.location.href = "/")}
					data-testid="header-logo"
				/>
				{/* Search bar */}
				<SearchBar />
			</div>

			{/* Buttons on the right */}
			<div className="flex space-x-6 mr-6" data-testid="header-buttons">
				<AdminButton />
				<InsightButton />
				<LoginButton />
			</div>
		</header>
	);
};

export default Header;
