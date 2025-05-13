import React from 'react';
import EditButton from "../buttons/edit_button";

interface EmployeeUpdateData {
    jobTitle: string;
    salary: number;
    gender: string;
    experience: number;
}

interface CompanyEmployeeTableProps {
    editable?: boolean;
    data: Array<{
        id: number;
        jobTitle: string;
        salary: number;
        gender: string;
        experience: number;
        companyID?: number;
    }>;
    onSave?: (index: number, updatedData: EmployeeUpdateData) => void;
    onDelete?: (index: number) => void;
}

const CompanyEmployeeTable: React.FC<CompanyEmployeeTableProps> = ({ 
    editable = false, 
    data,
    onSave,
    onDelete 
}) => {
    // Handle Save
    const handleSave = async (index: number, updatedData: EmployeeUpdateData) => {
        if (onSave) {
            onSave(index, updatedData);
        }
    };

    // Handle Delete
    const handleDelete = async (index: number) => {
        if (onDelete) {
            onDelete(index);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full">
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] bg-gradient-to-r from-sky-600 to-sky-500 text-white font-bold">
                <div className="p-4">ID</div>
                <div className="p-4">Job Title</div>
                <div className="p-4">Salary</div>
                <div className="p-4">Experience</div>
                <div className="p-4">Gender</div>
                {editable && <div className="p-4 text-center">Edit</div>}
            </div>

            {/* Table Body */}
            <div className="overflow-y-auto max-h-96">
                {data.map((employee, index) => (
                    <div
                        key={employee.id}
                        className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] border-b border-gray-200 hover:bg-blue-50"
                    >
                        <div className="p-4 text-gray-700">{employee.id}</div>
                        <div className="ml-2 p-4 text-gray-700">{employee.jobTitle || 'N/A'}</div>
                        <div className="ml-4 p-4 text-gray-700">
                            {employee.salary ? `${employee.salary} kr.` : 'N/A'}
                        </div>
                        <div className="ml-4 p-4 text-gray-700">
                            {employee.experience ? `${employee.experience} yrs` : 'N/A'}
                        </div>
                        <div className="ml-6 p-4 text-gray-700">{employee.gender || 'N/A'}</div>
                        {editable && (
                            <div className="ml-6 p-4 flex justify-center">
                                <EditButton
                                    id={employee.id}
                                    position={employee.jobTitle || ''}
                                    salary={employee.salary?.toString() || '0'}
                                    gender={employee.gender || ''}
                                    experience={employee.experience?.toString() || '0'}
                                    companyID={employee.companyID || 0}
                                    onSave={(updatedData) =>
                                        handleSave(index, {
                                            jobTitle: updatedData.position,
                                            salary: Number(updatedData.salary) || 0,
                                            gender: updatedData.gender,
                                            experience: Number(updatedData.experience) || 0
                                        })
                                    }
                                    onDelete={() => handleDelete(index)}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyEmployeeTable; 