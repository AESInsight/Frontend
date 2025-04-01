import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

const InsightButton: React.FC = () => {
	const navigate = useNavigate();

	return (
		<button
			onClick={() => navigate("/insight")}
			className="text-white flex items-center transition-transform duration-200 hover:scale-115 cursor-pointer"
		>
			<FontAwesomeIcon icon={faEdit} className="mr-2" />
			<span>Insight</span>
		</button>
	);
};

export default InsightButton;
