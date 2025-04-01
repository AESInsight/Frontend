import { executeQuery } from '../config/database';
import { AuthResponse } from '../types/user';
import { comparePasswords, hashPassword } from '../utils/password';
import { isPasswordStrong } from '../utils/passwordStrength';

class UserService {
    static async verifyCompanyLogin(email: string, password: string): Promise<AuthResponse | null> {
        try {
            // First get the user with the hashed password
            const query = `
                SELECT l.UserID, l.Email, l.Password, c.CompanyID, c.CompanyName
                FROM Login l
                JOIN CompanyLogin cl ON l.UserID = cl.UserID
                JOIN Company c ON cl.CompanyID = c.CompanyID
                WHERE l.Email = ?
            `;

            const results = await executeQuery<(AuthResponse & { Password: string })[]>(query, [email]);
            
            if (!results[0]) return null;

            // Verify password
            const isValid = await comparePasswords(password, results[0].Password);
            if (!isValid) return null;

            // Return user data without password
            const { Password, ...userData } = results[0];
            return userData;
        } catch (error) {
            console.error('Error verifying company login:', error);
            throw error;
        }
    }

    static async getCompanyEmployees(companyId: number) {
        try {
            const query = `
                SELECT e.*
                FROM Employee e
                JOIN CompanyEmployee ce ON e.EmployeeID = ce.EmployeeID
                WHERE ce.CompanyID = ?
            `;

            return await executeQuery(query, [companyId]);
        } catch (error) {
            console.error('Error getting company employees:', error);
            throw error;
        }
    }

    static async resetPassword(token: string, newPassword: string): Promise<boolean> {
        try {
            if (!isPasswordStrong(newPassword)) {
                throw new Error('Password does not meet strength requirements');
            }

            const query = `
                SELECT UserID
                FROM Login
                WHERE ResetToken = ? AND ResetTokenExpires > NOW()
            `;
            
            const results = await executeQuery<{ UserID: number }[]>(query, [token]);
            if (!results[0]) return false;

            const hashedPassword = await hashPassword(newPassword);
            const updateQuery = `
                UPDATE Login
                SET Password = ?, ResetToken = NULL, ResetTokenExpires = NULL
                WHERE ResetToken = ?
            `;
            
            await executeQuery(updateQuery, [hashedPassword, token]);
            return true;
        } catch (error) {
            console.error('Error resetting password:', error);
            throw error;
        }
    }
}

export default UserService; 