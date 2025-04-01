import zxcvbn from 'zxcvbn';

export interface PasswordStrength {
    score: number;
    feedback: {
        warning: string;
        suggestions: string[];
    };
}

export function checkPasswordStrength(password: string): PasswordStrength {
    const result = zxcvbn(password);
    return {
        score: result.score,
        feedback: result.feedback
    };
}

export function isPasswordStrong(password: string): boolean {
    const result = checkPasswordStrength(password);
    return result.score >= 3; // Requires at least a score of 3 out of 4
} 