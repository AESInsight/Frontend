export interface User {
    id: number;
    email: string;
    role: 'Company' | 'User';
    companyId?: number;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: number;
        email: string;
        role: 'Company' | 'User';
    };
}

export interface Company {
    id: number;
    name: string;
    cvr: string;
}

export interface Employee {
    EmployeeID: number;
    JobTitle: string;
    Salary: number;
    Experience: number;
    Gender: string;
    CompanyID: number;
}

export interface Login {
    UserID: number;
    Email: string;
}

export interface CompanyEmployee {
    CompanyID: number;
    EmployeeID: number;
}

export interface CompanyLogin {
    UserID: number;
    CompanyID: number;
} 