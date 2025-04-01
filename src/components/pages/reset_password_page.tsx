import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputField from '../fields/input_field';
import { checkPasswordStrength, isPasswordStrong } from '../../utils/passwordStrength';
import UserService from '../../services/userService';

const ResetPasswordPage: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [strength, setStrength] = useState<any>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setStrength(checkPasswordStrength(newPassword));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setStatus('loading');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setStatus('error');
            return;
        }

        if (!isPasswordStrong(password)) {
            setError('Please choose a stronger password');
            setStatus('error');
            return;
        }

        try {
            const success = await UserService.resetPassword(token!, password);
            if (success) {
                setStatus('success');
                setTimeout(() => navigate('/'), 3000);
            } else {
                setError('Invalid or expired reset token');
                setStatus('error');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6">Reset Your Password</h1>

                {status === 'success' ? (
                    <div className="text-green-600">
                        Password successfully reset! Redirecting to login...
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                                {error}
                            </div>
                        )}

                        <InputField
                            label="New Password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="mb-4"
                        />

                        {strength && (
                            <div className="mb-4">
                                <div className="h-2 bg-gray-200 rounded">
                                    <div 
                                        className={`h-full rounded transition-all ${
                                            strength.score <= 1 ? 'bg-red-500' :
                                            strength.score === 2 ? 'bg-yellow-500' :
                                            strength.score === 3 ? 'bg-green-500' :
                                            'bg-green-600'
                                        }`}
                                        style={{ width: `${(strength.score + 1) * 25}%` }}
                                    />
                                </div>
                                {strength.feedback.warning && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {strength.feedback.warning}
                                    </p>
                                )}
                            </div>
                        )}

                        <InputField
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mb-6"
                        />

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className={`w-full py-2 px-4 bg-sky-600 text-white rounded hover:bg-sky-700 
                                ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {status === 'loading' ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage; 