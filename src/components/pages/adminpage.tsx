import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../../lib/employeeAPI";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";
import EmployeeTable, { TableRow } from "../tables/EmployeeTable";

// Backend type
interface Employee {
  employeeID: number;
  jobTitle: string;
  salary: number;
  experience: number;
  gender: string;
  companyID: number;
}

const AdminPage: React.FC = () => {
  const {
    data: employees,
    isLoading,
    isError,
    error,
  } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const [tableData, setTableData] = useState<TableRow[]>([]);

  // Sync tableData when data loads
  useEffect(() => {
    if (employees) {
      const mapped = employees.map((e) => ({
        id: e.employeeID,
        jobTitle: e.jobTitle,
        salary: e.salary,
        gender: e.gender,
        experience: e.experience,
      }));
      setTableData(mapped);
    }
  }, [employees]);

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

            {/* Loading / Error states */}
            {isLoading && <p className="text-center">Loading...</p>}
            {isError && (
              <div className="text-center text-red-500">
                <p>Error fetching employees.</p>
                <p>{(error as Error)?.message}</p>
              </div>
            )}

            {/* Table */}
            {!isLoading && tableData.length > 0 && (
              <div className="max-w-6xl mx-auto w-full px-4">
                <EmployeeTable
                  editable={true}
                  data={tableData}
                  onSave={handleSave}
                  onDelete={handleDelete}
                />
              </div>
            )}
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
