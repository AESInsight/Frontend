import React, { useEffect, useState } from "react";
import InputField from "../fields/input_field";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: { position: string; salary: string; gender: string; experience: string }) => void;
  onDelete: () => void;
  initialData: { position: string; salary: string; gender: string; experience: string };
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
}) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [editedData, setEditedData] = useState(initialData);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setFadeIn(true), 10);
    } else {
      setFadeIn(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleChange = (field: string, value: string) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const formatSalary = (value: string) => {
    if (!value) return "";
    return parseInt(value, 10).toLocaleString("da-DK");
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-xs flex items-center justify-center z-50 transition-opacity duration-300 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-2xl shadow-xl p-6 w-80 transform transition-all duration-300 border-2 border-black ${
          fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4 text-center">Edit Details</h2>

        <InputField
          label="Position"
          placeholder="Enter position"
          value={editedData.position}
          onChange={(e) => {
            let value = e.target.value;
            if (value.length > 30) {
              value = value.slice(0, 30);
            }
            handleChange("position", value);
          }}
          maxLength={30}
        />

        <InputField
          label="Salary"
          placeholder="Enter salary"
          value={formatSalary(editedData.salary)}
          onChange={(e) => {
            let numericValue = e.target.value.replace(/\D/g, '');
            if (numericValue.length > 7) {
              numericValue = numericValue.slice(0, 7);
            }
            handleChange("salary", numericValue);
          }}
          type="text"
          suffix="kr."
        />

        <InputField
          label="Gender"
          placeholder="Enter gender"
          value={editedData.gender}
          onChange={(e) => {
            let value = e.target.value;
            if (value.length > 6) {
              value = value.slice(0, 6);
            }
            handleChange("gender", value);
          }}
          maxLength={6}
        />

        <InputField
          label="Experience"
          placeholder="Enter experience"
          value={editedData.experience}
          onChange={(e) => {
            let numericValue = e.target.value.replace(/\D/g, '');
            if (numericValue.length > 2) {
              numericValue = numericValue.slice(0, 2);
            }
            handleChange("experience", numericValue);
          }}
          type="text"
          suffix={editedData.experience === "1" ? "yr." : "yrs."}
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedData)}
            className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 text-sm"
          >
            Save Changes
          </button>
          <button
            onClick={onDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
