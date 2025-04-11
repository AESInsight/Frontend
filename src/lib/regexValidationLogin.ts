// Regular expressions for validation
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REQUIREMENTS = {
    minLength: 8,
    hasUpperCase: /[A-Z]/,
    hasNumber: /\d/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/
};

export interface PasswordValidationResult {
    isValid: boolean;
    errors: string[];
}

export const validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string): PasswordValidationResult => {
    const errors: string[] = [];

    if (password.length < PASSWORD_REQUIREMENTS.minLength) {
        errors.push(`Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long`);
    }

    if (!PASSWORD_REQUIREMENTS.hasUpperCase.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (!PASSWORD_REQUIREMENTS.hasNumber.test(password)) {
        errors.push('Password must contain at least one number');
    }

    if (!PASSWORD_REQUIREMENTS.hasSpecialChar.test(password)) {
        errors.push('Password must contain at least one special character');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

// Helper function to get real-time password strength
export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
    const validationResult = validatePassword(password);
    const errorCount = validationResult.errors.length;

    if (errorCount === 0) return 'strong';
    if (errorCount <= 2) return 'medium';
    return 'weak';
};