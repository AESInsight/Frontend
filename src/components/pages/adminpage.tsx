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
            <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Page</h1>

            {/* Tabel */}
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-full self-center mt-2">
                <div className="overflow-auto max-h-96">
                  <table className="border border-gray-300 table-fixed">
                    <thead className="bg-gradient-to-r from-sky-600 to-sky-500 text-white sticky top-0 z-10">
                      <tr>
                        <th className="px-6 py-3 font-bold self-center w-60">Position</th>
                        <th className="px-6 py-3 font-bold self-center w-30">Salary</th>
                        <th className="px-6 py-3 font-bold self-center w-10">Gender</th>
                        <th className="px-6 py-3 font-bold self-center w-50">Experience</th>
                        <th className="px-6 py-3 font-bold self-center w-10">Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-blue-50">
                          <td className="px-6 py-3 text-gray-700 w-60 break-words">
                            {row.position.length > 50 ? row.position.slice(0, 50) + "..." : row.position}
                          </td>
                          <td className="px-6 py-3 text-gray-700 w-30 break-words">
                            {row.salary} kr.
                          </td>
                          <td className="px-6 py-3 text-gray-700 w-10 break-words">
                            {row.gender.length > 50 ? row.gender.slice(0, 50) + "..." : row.gender}
                          </td>
                          <td className="px-6 py-3 text-gray-700 w-50 break-words">
                            {row.experience.length > 50 ? row.experience.slice(0, 50) + "..." : row.experience}
                          </td>
                          <td className="px-6 py-3 text-gray-700 w-10">
                            <EditButton
                              position={row.position}
                              salary={row.salary}
                              gender={row.gender}
                              experience={row.experience}
                              onSave={(updatedData) => handleSave(index, updatedData)}
                              onDelete={() => handleDelete(index)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
