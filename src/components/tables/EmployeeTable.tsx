import React from "react";
import EditButton from "../buttons/edit_button";

export interface TableRow {
  id?: number | string;
  jobTitle: string;
  salary: number | string;
  gender: string;
  experience: number | string;
}

interface EmployeeTableProps {
  data: TableRow[];
  editable?: boolean;
  onSave?: (index: number, updatedData: TableRow) => void;
  onDelete?: (index: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  data,
  editable = true,
  onSave,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full">
      <div className="overflow-y-auto max-h-96">
        <div
          className={`grid ${
            editable
              ? "grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr]"
              : "grid-cols-[1fr_2fr_1fr_1fr_1fr]"
          } bg-gradient-to-r from-sky-600 to-sky-500 text-white font-bold sticky top-0 z-10`}
        >
          <div className="p-4">ID</div>
          <div className="p-4">Job Title</div>
          <div className="p-4">Salary</div>
          <div className="p-4">Experience</div>
          <div className="p-4">Gender</div>
          {editable && <div className="p-4 text-center">Edit</div>}
        </div>

        {data.map((row, index) => (
          <div
            key={row.id ?? index}
            className={`grid ${
              editable
                ? "grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr]"
                : "grid-cols-[1fr_2fr_1fr_1fr_1fr]"
            } border-b border-gray-200 hover:bg-blue-50`}
          >
            <div className="p-4 text-gray-700">{row.id ?? "N/A"}</div>
            <div className="p-4 text-gray-700">{row.jobTitle || "N/A"}</div>
            <div className="p-4 text-gray-700">{row.salary} kr.</div>
            <div className="p-4 text-gray-700">
              {row.experience
                ? `${row.experience} ${
                    parseInt(row.experience.toString()) === 1 ? "yr." : "yrs."
                  }`
                : "-"}
            </div>
            <div className="p-4 text-gray-700">{row.gender || "N/A"}</div>
            {editable && (
              <div className="p-4 flex justify-center">
                <EditButton
                  position={row.jobTitle}
                  salary={row.salary.toString()}
                  gender={row.gender}
                  experience={row.experience.toString()}
                  onSave={(updatedData) =>
                    onSave && onSave(index, { ...row, ...updatedData })
                  }
                  onDelete={() => onDelete && onDelete(index)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTable;
