// styled_header_button.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface StyledHeaderButtonProps {
	icon: IconDefinition;
	text: string;
	onClick: () => void;
	className?: string;
}

const StyledHeaderButton: React.FC<StyledHeaderButtonProps> = ({
	icon,
	text,
	onClick,
	className = "",
}) => {
	return (
		<button
			onClick={onClick}
			className={`text-white text-md	 flex items-center gap-2 py-2 rounded-md transition-transform duration-300 ease-in-out hover:scale-115 cursor-pointer ${className}`}
		>
			<FontAwesomeIcon icon={icon} />
			<span>{text}</span>
		</button>
	);
};

export default StyledHeaderButton;
