import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import EditModal from "../modals/edit_modal";

interface EditButtonProps {
  position: string;
  salary: string;
  gender: string;
  experience: string;
  onSave: (updatedData: { position: string; salary: string; gender: string; experience: string }) => void;
}

const EditButton: React.FC<EditButtonProps> = ({ position, salary, gender, experience, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedData, setEditedData] = useState({ position, salary, gender, experience });

  const handleSave = (updatedData: { position: string; salary: string; gender: string; experience: string }) => {
    onSave(updatedData);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-700 flex items-center transition-transform duration-300 ease-in-out hover:scale-115 cursor-pointer"
      >
        <FontAwesomeIcon icon={faEdit} className="mr-2" />
      </button>

      <EditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={(updatedData) => {
          setEditedData(updatedData);
          handleSave(updatedData);
        }}
        initialData={editedData}
      />
    </>
  );
};

export default EditButton;