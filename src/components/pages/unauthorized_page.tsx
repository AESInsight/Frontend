import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../ui/header';

const UnauthorizedPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen flex flex-col relative">
            <Header />
            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
                    <p className="text-gray-600 mb-6">
                        You don't have permission to access this page.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition-colors"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage; 