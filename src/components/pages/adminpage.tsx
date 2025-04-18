import React, { useState } from "react";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";
import EmployeeTable, { TableRow } from "../tables/EmployeeTable";

const AdminPage: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>(
    Array(20)
      .fill(null)
      .map((_, i) => ({
        id: i + 1,
        jobTitle: "Position",
        salary: "Salary",
        gender: "Gender",
        experience: "Experience",
      }))
  );

  const handleSave = (index: number, updatedData: TableRow) => {
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
            <h1 className="text-3xl font-bold mb-4 text-center">
              Welcome to the Admin Page
            </h1>

            <div className="max-w-6xl mx-auto w-full px-4">
              <EmployeeTable
                editable={true}
                data={tableData}
                onSave={handleSave}
                onDelete={handleDelete}
              />
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
