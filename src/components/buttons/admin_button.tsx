import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminButton: React.FC = () => {
	const navigate = useNavigate();

	return (
		<button
			onClick={() => navigate("/admin")}
			className="text-white flex items-center transition-transform duration-200 hover:scale-115 cursor-pointer"
		>
			<FontAwesomeIcon icon={faUserShield} className="mr-2" />
			<span>Admin</span>
		</button>
	);
};

export default AdminButton;
