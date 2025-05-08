import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import EditModal from "../modals/edit_modal";

interface EditButtonProps {
	id: number | string;
	position: string;
	salary: string;
	gender: string;
	experience: string;
	companyID: number;
	onSave: (updatedData: {
		position: string;
		salary: string;
		gender: string;
		experience: string;
	}) => void;
	onDelete: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({
	id,
	position,
	salary,
	gender,
	experience,
	companyID,
	onSave,
	onDelete,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleSave = (updatedData: {
		position: string;
		salary: string;
		gender: string;
		experience: string;
	}) => {
		onSave(updatedData);
		setIsOpen(false);
	};

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this row?")) {
			onDelete();
			setIsOpen(false);
		}
	};

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="text-gray-700 flex items-center transition-transform duration-300 ease-in-out hover:scale-115 cursor-pointer"
			>
				<FontAwesomeIcon icon={faEdit} className="p-1" />
			</button>

			<EditModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onSave={handleSave}
				onDelete={handleDelete}
				initialData={{ id, position, salary, gender, experience, companyID }}
			/>
		</>
	);
};

export default EditButton;
