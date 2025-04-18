import React, { useState } from "react";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";
import EditButton from "../buttons/edit_button";

const AdminPage: React.FC = () => {
  const [tableData, setTableData] = useState(
    Array(20).fill(null).map(() => ({
      position: "Position",
      salary: "Salary",
      gender: "Gender",
      experience: "Experience",
    }))
  );

  const handleSave = (index: number, updatedData: { position: string; salary: string; gender: string; experience: string }) => {
    const newData = [...tableData];
    newData[index] = updatedData;
    setTableData(newData);
  };

  const handleDelete = (index: number) => {
    const newData = tableData.filter((_, i) => i !== index);
    setTableData(newData);
  };

  return (
    <div className="h-screen w-screen flex flex-col relative">
      <div className="relative z-10 flex flex-col h-full">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 text-black">
            <h1 className="text-3xl font-bold mb-4 text-center">Welcome to the Admin Page</h1>

            {/* Wrapper */}
            <div className="max-w-6xl mx-auto w-full px-4">
              <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full">
                <div className="overflow-y-auto max-h-96">

                  {/* Sticky Header */}
                  <div className="grid grid-cols-[2fr_2fr_1fr_2fr_0.5fr] bg-gradient-to-r from-sky-600 to-sky-500 text-white font-bold sticky top-0 z-10">
                    <div className="p-4">Position</div>
                    <div className="p-4">Salary</div>
                    <div className="p-4">Gender</div>
                    <div className="p-4">Experience</div>
                    <div className="p-4 text-center">Edit</div>
                  </div>

                  {/* Rows */}
                  {tableData.map((row, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[2fr_2fr_1fr_2fr_0.5fr] border-b border-gray-200 hover:bg-blue-50"
                    >
                      <div className="p-4 text-gray-700">{row.position}</div>
                      <div className="p-4 text-gray-700">{row.salary} kr.</div>
                      <div className="p-4 text-gray-700">{row.gender}</div>
                      <div className="p-4 text-gray-700">
                        {row.experience
                          ? `${row.experience} ${parseInt(row.experience) === 1 ? "yr." : "yrs."}`
                          : "-"}
                      </div>
                      <div className="p-4 flex justify-center">
                        <EditButton
                          position={row.position}
                          salary={row.salary}
                          gender={row.gender}
                          experience={row.experience}
                          onSave={(updatedData) => handleSave(index, updatedData)}
                          onDelete={() => handleDelete(index)}
                        />
                      </div>
                    </div>
                  ))}
                  
                </div>
              </div>
            </div>
          </main>
        </div>

        <footer className="p-2 bg-gray-800 text-white text-center text-xs relative z-10">
          <p>2025 AES-Insight. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminPage;
