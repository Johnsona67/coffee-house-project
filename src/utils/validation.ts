export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export class ValidationUtils {
  static validateLogin(login: string): ValidationResult {
    if (login.length < 3) {
      return { isValid: false, message: 'Login must be at least 3 characters long' };
    }
    
    if (!/^[a-zA-Z]/.test(login)) {
      return { isValid: false, message: 'Login must start with a letter' };
    }
    
    if (!/^[a-zA-Z]+$/.test(login)) {
      return { isValid: false, message: 'Only English alphabet letters are allowed' };
    }
    
    return { isValid: true, message: '' };
  }

  static validatePassword(password: string): ValidationResult {
    if (password.length < 6) {
      return { isValid: false, message: 'Password must be at least 6 characters long' };
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least 1 special character' };
    }
    
    return { isValid: true, message: '' };
  }

  static validatePasswordMatch(password: string, confirmPassword: string): ValidationResult {
    if (password !== confirmPassword) {
      return { isValid: false, message: 'Passwords do not match' };
    }
    
    return { isValid: true, message: '' };
  }

  static validateHouseNumber(houseNumber: number): ValidationResult {
    if (houseNumber <= 1) {
      return { isValid: false, message: 'House number must be greater than 1' };
    }
    
    return { isValid: true, message: '' };
  }

  static validateRequired(value: string, fieldName: string): ValidationResult {
    if (!value || value.trim() === '') {
      return { isValid: false, message: `${fieldName} is required` };
    }
    
    return { isValid: true, message: '' };
  }
}
