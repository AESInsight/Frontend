import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSignInAlt,
	faUserShield,
	faEdit,
} from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
	return (
		<header className="bg-gradient-to-r from-sky-800 to-cyan-600 flex items-center justify-between h-16 w-auto border-b-2 border-black">
			{/* Logo */}
			<img
				src="../../public/aesinsight.png"
				className="h-20 w-64 object-contain ml-1"
			/>

			{/* Buttons on the right */}
			<div className="flex space-x-6 mr-6">
				<button className="text-white flex items-center transition-transform duration-200 hover:scale-115">
					<FontAwesomeIcon icon={faEdit} className="mr-2" />
					Edit Data
				</button>
				<button className="text-white flex items-center transition-transform duration-200 hover:scale-115">
					<FontAwesomeIcon icon={faUserShield} className="mr-2" />
					Admin
				</button>
				<button className="text-white flex items-center transition-transform duration-200 hover:scale-115">
					<FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
					Login
				</button>
			</div>
		</header>
	);
};

export default Header;
