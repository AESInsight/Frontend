import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import LoginButton from "../buttons/login_button";
import AdminButton from "../buttons/admin_button";
import InputField from "../fields/input_field";

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
				<InputField
					placeholder="Search for data..."
					value=""
					onChange={(e) => console.log(e.target.value)}
					className="w-65 p-2 text-black bg-[rgba(156,206,235,0.81)] border border-sky-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 mt-4"
				/>
			</div>

			{/* Buttons on the right */}
			<div className="flex space-x-6 mr-6">
				<AdminButton />
				<button className="text-white flex items-center transition-transform duration-200 hover:scale-115 cursor-pointer">
					<FontAwesomeIcon icon={faEdit} className="mr-2" />
					Edit Data
				</button>
				<LoginButton />
			</div>
		</header>
	);
};

export default Header;
