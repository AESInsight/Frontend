export interface CompanyDetails {
    id: number;
    name: string;
    cvr: string;
    // Add any other company properties from your .NET model
}

export interface UserDetails {
    id: number;
    email: string;
    role: 'Company' | 'User';
    // Add any other user properties from your .NET model
}

export interface ApiError {
    message: string;
    statusCode: number;
}

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    error?: ApiError;
} 