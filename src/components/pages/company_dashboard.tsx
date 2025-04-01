import React from 'react';
import Header from '../ui/header';
import Sidebar from '../ui/sidebar';

const CompanyDashboard: React.FC = () => {
    return (
        <div className="h-screen w-screen flex flex-col relative">
            <div className="relative z-10 flex flex-col h-full">
                <Header />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 p-4 text-black">
                        <h1 className="text-3xl font-bold mb-4">Company Dashboard</h1>
                        <p>Welcome to your company dashboard.</p>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CompanyDashboard; 