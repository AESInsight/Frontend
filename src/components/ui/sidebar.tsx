import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faHome,
	faInfoCircle,
	faBriefcase,
	faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import StyledSidebarButton from "../buttons/styled_sidebar_button";

const Sidebar: React.FC = () => {
	const [isCollapsed, setIsCollapsed] = useState(true); // Start in collapsed state
	const [selectedPage, setSelectedPage] = useState<string>("Home"); // Track selected page
	const navigate = useNavigate();

	const handleNavigation = (label: string) => {
		setSelectedPage(label);
		if (label === "Home") {
			navigate("/"); // should be /
		}
		if (label === "About") {
			navigate("/about");
		}
		if (label === "Services") {
			navigate("/services");
		}
		if (label === "Contact") {
			navigate("/contact");
		}
		return selectedPage;
	};

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
					<StyledSidebarButton
						key={label}
						icon={icon}
						label={label}
						isCollapsed={isCollapsed}
						onClick={() => handleNavigation(label)}
					/>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
