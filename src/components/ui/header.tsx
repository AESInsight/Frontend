import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield, faEdit } from "@fortawesome/free-solid-svg-icons";
import LoginButton from "../buttons/login_button";

const Header: React.FC = () => {
	return (
		<header className="bg-gradient-to-r from-sky-700 to-sky-400 flex items-center justify-between h-16 w-auto border-b-2 border-black">
			{/* Logo */}
			<img
				src="/aesinsight.png"
				className="h-20 w-64 object-contain ml-1 cursor-pointer"
				onClick={() => (window.location.href = "/")}
			/>

			{/* Buttons on the right */}
			<div className="flex space-x-6 mr-6">
				<button className="text-white flex items-center transition-transform duration-200 hover:scale-115 cursor-pointer">
					<FontAwesomeIcon icon={faEdit} className="mr-2" />
					Edit Data
				</button>
				<button className="text-white flex items-center transition-transform duration-200 hover:scale-115 cursor-pointer">
					<FontAwesomeIcon icon={faUserShield} className="mr-2" />
					Admin
				</button>
				<LoginButton />
			</div>
		</header>
	);
};

export default Header;
