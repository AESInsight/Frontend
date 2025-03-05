import React, { useState } from "react";

const Sidebar: React.FC = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<div
			className={`bg-sky-500 h-auto ${isCollapsed ? "w-16" : "w-64"} p-4 transition-width duration-300`}
		>
			<button onClick={toggleSidebar} className="text-white mb-4">
				{isCollapsed ? "Expand" : "Collapse"}
			</button>
			<ul className={`${isCollapsed ? "hidden" : "block"}`}>
				<li className="text-white py-2">Home</li>
				<li className="text-white py-2">About</li>
				<li className="text-white py-2">Services</li>
				<li className="text-white py-2">Contact</li>
			</ul>
		</div>
	);
};

export default Sidebar;
