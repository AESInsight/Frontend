import React from "react";
import { FaCog, FaEye } from "react-icons/fa";

const DefaultComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-blue-900 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">ASEInsight</h1>
        <p className="text-lg mb-4">More to come...</p>
        <div className="flex space-x-4 justify-center">
          <div className="flex flex-col items-center bg-blue-100 p-4 rounded-lg shadow-md">
            <FaEye size={40} className="text-blue-600" />
            <p className="mt-2">Clear visiuality</p>
          </div>
          <div className="flex flex-col items-center bg-blue-100 p-4 rounded-lg shadow-md">
            <FaCog size={40} className="text-blue-600" />
            <p className="mt-2">Development</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultComponent;
