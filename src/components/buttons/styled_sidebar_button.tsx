import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface StyledSidebarButtonProps {
	icon: IconDefinition;
	label: string;
	isCollapsed: boolean;
	onClick: () => void;
}

const StyledSidebarButton: React.FC<StyledSidebarButtonProps> = ({
	icon,
	label,
	isCollapsed,
	onClick,
}) => {
	return (
		<button
			className={`text-black flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 hover:text-gray-500 hover:bg-gray-100 ${
				isCollapsed ? "justify-center" : "justify-start space-x-4"
			}`}
			onClick={onClick}
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
	);
};

export default StyledSidebarButton;
