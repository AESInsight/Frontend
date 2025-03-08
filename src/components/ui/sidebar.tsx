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
			className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white/10 backdrop-blur-lg shadow-lg transition-all duration-200 flex flex-col p-4 items-center ${
				isCollapsed ? "w-16" : "w-64"
			}`}
			onMouseEnter={() => setIsCollapsed(false)}
			onMouseLeave={() => setIsCollapsed(true)}
		>
			{/* Sidebar Toggle Button */}
			<button className="text-black text-xl mb-6 transition-transform duration-200 hover:scale-110 self-center">
				<FontAwesomeIcon icon={faBars} />
			</button>

			{/* Navigation Buttons */}
			<div className="space-y-6 w-full">
				{[
					{ icon: faHome, label: "Home" },
					{ icon: faInfoCircle, label: "About" },
					{ icon: faBriefcase, label: "Services" },
					{ icon: faEnvelope, label: "Contact" },
				].map(({ icon, label }) => (
					<button
						key={label}
						className={`text-black flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 hover:text-gray-500 hover:bg-gray-100 ${
							isCollapsed ? "justify-center" : "justify-start space-x-4"
						}`}
					>
						<FontAwesomeIcon
							icon={icon}
							className="text-lg transition-all duration-200"
						/>
						<span
							className={`transition-all duration-200 whitespace-nowrap ${
								isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
							}`}
						>
							{label}
						</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
