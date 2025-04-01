import React, { useState } from 'react';
import InputField from '../fields/input_field';
import UserService from '../../services/userService';

interface PasswordResetModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            setStatus('loading');
            setError('');
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError('Please enter a valid email address');
                setStatus('error');
                return;
            }

            const success = await UserService.requestPasswordReset(email);
            if (success) {
                setStatus('success');
            } else {
                setError('Email not found');
                setStatus('error');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
            setStatus('error');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
                
                {status === 'success' ? (
                    <div className="text-green-600 mb-4">
                        If an account exists with this email, you will receive password reset instructions shortly.
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                                {error}
                            </div>
                        )}
                        
                        <InputField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />

                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={status === 'loading'}
                                className={`px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-700 
                                    ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {status === 'loading' ? 'Sending...' : 'Reset Password'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PasswordResetModal; 