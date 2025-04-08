import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import StyledHeaderButton from "./styled_header_button";

const AdminButton: React.FC = () => {
	const navigate = useNavigate();

	return (
		<StyledHeaderButton
			icon={faUserShield}
			text="Admin"
			onClick={() => navigate("/admin")}
		/>
	);
};

export default AdminButton;
