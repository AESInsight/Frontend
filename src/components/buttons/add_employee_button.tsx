import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import AddEmployeeModal from "../modals/add_employee_modal";

const AddEmployeeButton: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpen = () => setIsModalOpen(true);
	const handleClose = () => setIsModalOpen(false);

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 flex items-center space-x-2"
			>
				<FontAwesomeIcon icon={faUserPlus} />
				<span>Add Employee</span>
			</button>

			<AddEmployeeModal isOpen={isModalOpen} onClose={handleClose} />
		</>
	);
};

export default AddEmployeeButton;
