import { faEdit } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import StyledHeaderButton from "./styled_header_button";

const InsightButton: React.FC = () => {
	const navigate = useNavigate();

	return (
		<StyledHeaderButton
			icon={faEdit}
			text="Insight"
			onClick={() => navigate("/insight")}
		/>
	);
};

export default InsightButton;
