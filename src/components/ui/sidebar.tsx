import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faHome,
	faInfoCircle,
	faBriefcase,
	faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar: React.FC = () => {
	const [isCollapsed, setIsCollapsed] = useState(true); // Start in collapsed state

	return (
		<div
			className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white/10 backdrop-blur-lg shadow-lg ${
				isCollapsed ? "w-16" : "w-64"
			} transition-all duration-200 flex flex-col p-4 items-center`}
			onMouseEnter={() => setIsCollapsed(false)}
			onMouseLeave={() => setIsCollapsed(true)}
		>
			{/* Sidebar Toggle Button */}
			<button className="text-black text-xl mb-6 transition-transform duration-200 hover:scale-110 self-center">
				<FontAwesomeIcon icon={faBars} />
			</button>

			{/* Navigation Items */}
			<ul className="space-y-6 w-full">
				<li
					className={`text-black flex ${isCollapsed ? "justify-center" : "items-center space-x-4"} cursor-pointer hover:text-gray-500 transition-all`}
				>
					<FontAwesomeIcon icon={faHome} className="text-lg" />
					{!isCollapsed && <span>Home</span>}
				</li>
				<li
					className={`text-black flex ${isCollapsed ? "justify-center" : "items-center space-x-4"} cursor-pointer hover:text-gray-500 transition-all`}
				>
					<FontAwesomeIcon icon={faInfoCircle} className="text-lg" />
					{!isCollapsed && <span>About</span>}
				</li>
				<li
					className={`text-black flex ${isCollapsed ? "justify-center" : "items-center space-x-4"} cursor-pointer hover:text-gray-500 transition-all`}
				>
					<FontAwesomeIcon icon={faBriefcase} className="text-lg" />
					{!isCollapsed && <span>Services</span>}
				</li>
				<li
					className={`text-black flex ${isCollapsed ? "justify-center" : "items-center space-x-4"} cursor-pointer hover:text-gray-500 transition-all`}
				>
					<FontAwesomeIcon icon={faEnvelope} className="text-lg" />
					{!isCollapsed && <span>Contact</span>}
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
