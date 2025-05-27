import { vi } from 'vitest'

// Mock API responses
export const mockLoginResponse = {
  token: 'mock-jwt-token',
  companyID: 123
}

export const mockResetPasswordResponse = {
  message: 'Password reset email sent'
}

export const mockAddEmployeeResponse = {
  message: 'Employee and salary added successfully.'
}

export const mockUpdateEmployeeResponse = {
  message: 'Employee and salary updated successfully.'
}

export const mockDeleteEmployeeResponse = {
  message: 'Employee deleted successfully.'
}

// Mock error responses
export const mockLoginError = {
  response: {
    data: {
      message: 'Invalid credentials'
    }
  }
}

export const mockResetPasswordError = {
  response: {
    data: {
      message: 'Email not found'
    }
  }
}

export const mockAddEmployeeError = {
  response: {
    data: {
      message: 'Failed to add employee'
    }
  }
}

export const mockUpdateEmployeeError = {
  response: {
    data: {
      message: 'Failed to update employee'
    }
  }
}

export const mockDeleteEmployeeError = {
  response: {
    data: {
      message: 'Failed to delete employee'
    }
  }
}

// Mock form data
export const mockEmployeeData = {
  id: 1,
  position: 'Software Developer',
  salary: '50000',
  gender: 'Male',
  experience: '5',
  companyID: 1
}

export const mockJobTitles = {
  jobTitles: ['Software Developer', 'Product Manager']
}

// Mock auth context
export const mockAuthContext = {
  login: vi.fn(),
  logout: vi.fn(),
  isAuthenticated: false,
  token: null
}

// Mock component props
export const mockModalProps = {
  isOpen: true,
  onClose: vi.fn(),
  onSave: vi.fn(),
  onDelete: vi.fn(),
  onLogin: vi.fn(),
  onLoginSuccess: vi.fn(),
  onEmployeeAdded: vi.fn()
} 