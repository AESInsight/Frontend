import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import AddEmployeeModal from "../modals/add_employee_modal";

interface AddEmployeeButtonProps {
	onEmployeeAdded?: () => void; // New prop for callback
}

const AddEmployeeButton: React.FC<AddEmployeeButtonProps> = ({
	onEmployeeAdded,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpen = () => setIsModalOpen(true);
	const handleClose = () => setIsModalOpen(false);

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 flex items-center space-x-1 md:space-x-2 text-[10px] md:text-base"
			>
				<FontAwesomeIcon
					icon={faUserPlus}
					className="text-[10px] md:text-base"
				/>
				<span>Add Employee</span>
			</button>

			<AddEmployeeModal
				isOpen={isModalOpen}
				onClose={handleClose}
				onEmployeeAdded={onEmployeeAdded} // Pass the callback
			/>
		</>
	);
};

export default AddEmployeeButton;
