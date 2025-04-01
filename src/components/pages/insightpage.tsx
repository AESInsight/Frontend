import React from "react";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";

const InsightPage: React.FC = () => {
    return (
        <div className="h-screen w-screen flex flex-col relative">
            <div className="relative z-10 flex flex-col h-full">
                <Header />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 p-4 text-black">
                        <h1 className="text-3xl font-bold mb-4 text-center">Welcome to the Insight Page</h1>

                        {/* Container til tabellerne (Vertikal stack) */}
                        <div className="flex flex-col items-center gap-4">
                            {/* Første tabel (Company) */}
                            <div className="bg-white shadow-lg rounded-xl overflow-hidden max-h-96 overflow-y-auto w-40 self-start ml-20">  
                                <table className="border border-gray-300 rounded-xl w-full">
                                    <thead className="bg-gradient-to-r from-sky-600 to-sky-500 text-white sticky top-0 z-10">
                                        <tr>
                                            <th className="px-4 py-3 text-center font-medium">Company</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array(20).fill(null).map((_, index) => (
                                            <tr key={index} className="border-b border-gray-200 hover:bg-blue-50">
                                                <td className="px-6 py-3 text-center font-medium text-gray-700">Company</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Anden tabel*/}
                            <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-full self-center -mt-100">
                                <div className="overflow-auto max-h-96">
                                    <table className="w-full border border-gray-300">
                                        <thead className="bg-gradient-to-r from-sky-600 to-sky-500 text-white sticky top-0 z-10">
                                            <tr>
                                                <th className="px-6 py-3 font-bold text-left">Position</th>
                                                <th className="px-6 py-3 font-bold text-left">Salary</th>
                                                <th className="px-6 py-3 font-bold text-left">Gender</th>
                                                <th className="px-6 py-3 font-bold text-left">Experience</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array(20).fill(null).map((_, index) => (
                                                <tr key={index} className="border-b border-gray-200 hover:bg-blue-50">
                                                    <td className="px-6 py-3 text-gray-700">Position</td>
                                                    <td className="px-6 py-3 text-gray-700">Salary</td>
                                                    <td className="px-6 py-3 text-gray-700">Gender</td>
                                                    <td className="px-6 py-3 text-gray-700">Experience</td>
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

export default InsightPage;