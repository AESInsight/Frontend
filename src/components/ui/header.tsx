import React from "react";
import LoginButton from "../buttons/login_button";
import AdminButton from "../buttons/admin_button";
import SearchBar from "./search_bar";
import InsightButton from "../buttons/Insight_button";

const Header: React.FC = () => {
	return (
		<header className="bg-gradient-to-r from-sky-700 to-sky-400 flex items-center justify-between h-16 w-auto border-b-2 border-black">
			<div className="flex items-center space-x-4 flex-grow">
				{/* Logo */}
				<img
					src="/aesinsight.png"
					className="h-20 w-64 object-contain ml-1 cursor-pointer"
					onClick={() => (window.location.href = "/")}
				/>
				{/* Search bar */}
				<SearchBar />
			</div>

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
