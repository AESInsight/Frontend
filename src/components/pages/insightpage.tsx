import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../../lib/api";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import InputField from "../fields/input_field";

interface Employee {
  employeeID: number;
  jobTitle: string;
  salary: number;
  experience: number;
  gender: string;
  companyID: number;
}

const InsightPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: employees, isLoading, isError, error } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const filteredEmployees = employees
    ?.filter((employee) => {
      const search = searchTerm.toLowerCase();
      return (
        employee.jobTitle.toLowerCase().includes(search) ||
        employee.gender.toLowerCase().includes(search) ||
        String(employee.employeeID).includes(search) ||
        String(employee.salary).includes(search) ||
        String(employee.experience).includes(search)
      );
    })
    .sort((a, b) => a.employeeID - b.employeeID);

  return (
    <div className="h-screen w-screen flex flex-col relative">
      <div className="relative z-10 flex flex-col h-full">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 text-black">
            <h1 className="text-3xl font-bold mb-4 text-center">Employee Insights</h1>

            {/* Search Bar */}
            <div className="flex justify-center mb-6">
              <div className="relative w-120">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
                <InputField
                  placeholder="Search employee data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-9 pl-10 p-2 text-black bg-white border border-sky-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 mt-4"
                />
              </div>
            </div>

            {/* Handle loading state */}
            {isLoading && <p>Loading...</p>}

            {/* Handle error state */}
            {isError && (
              <div>
                <p>Error fetching employees.</p>
                <p className="text-red-500">{(error as Error)?.message}</p>
              </div>
            )}

            {/* Render employees table */}
            {filteredEmployees && filteredEmployees.length > 0 ? (
              <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-4xl mx-auto">
                <div className="overflow-x-auto max-h-96">
                  <table className="w-full table-fixed border border-gray-300">
                    <thead className="bg-gradient-to-r from-sky-600 to-sky-500 text-white sticky top-0 z-10">
                      <tr>
                        <th className="px-6 py-3 font-bold self-center w-8">ID</th>
                        <th className="px-6 py-3 font-bold self-center w-28">Job Title</th>
                        <th className="px-6 py-3 font-bold self-center w-10">Salary</th>
                        <th className="px-6 py-3 font-bold self-center w-10">Experience</th>
                        <th className="px-6 py-3 font-bold self-center w-10">Gender</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((employee) => (
                        <tr key={employee.employeeID} className="border-b border-gray-200 hover:bg-blue-50">
                          <td className="px-6 py-3 text-gray-700 w-8">{employee.employeeID || "N/A"}</td>
                          <td className="px-6 py-3 text-gray-700 w-28">{employee.jobTitle || "N/A"}</td>
                          <td className="px-6 py-3 text-gray-700 w-10">{employee.salary ? `${employee.salary} kr.` : "N/A"}</td>
                          <td className="px-6 py-3 text-gray-700 w-10">{employee.experience !== undefined && employee.experience !== null
    ? `${employee.experience} ${employee.experience === 1 ? "yr." : "yrs."}`
    : "N/A"}</td>
                          <td className="px-6 py-3 text-gray-700 w-10">{employee.gender || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              !isLoading && <p>No employees found.</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default InsightPage;
