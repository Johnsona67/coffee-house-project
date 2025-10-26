import { AuthApi } from '../api/auth';
import { ValidationUtils } from '../utils/validation';
import { ApiError } from '../api/client';

const STREET_DATA = {
  'New York': [
    'Broadway', '5th Avenue', 'Park Avenue', 'Madison Avenue', 'Lexington Avenue',
    'Central Park West', 'Columbus Avenue', 'Amsterdam Avenue', 'West End Avenue', 'Riverside Drive'
  ],
  'Los Angeles': [
    'Sunset Boulevard', 'Hollywood Boulevard', 'Wilshire Boulevard', 'Santa Monica Boulevard',
    'Melrose Avenue', 'Beverly Drive', 'Rodeo Drive', 'La Cienega Boulevard', 'Fairfax Avenue', 'Crescent Heights Boulevard'
  ],
  'Chicago': [
    'Michigan Avenue', 'State Street', 'Wacker Drive', 'Lake Shore Drive', 'Rush Street',
    'Clark Street', 'Dearborn Street', 'LaSalle Street', 'Wells Street', 'Franklin Street'
  ]
};

class RegisterPage {
  private form: HTMLFormElement;
  private loginInput: HTMLInputElement;
  private passwordInput: HTMLInputElement;
  private confirmPasswordInput: HTMLInputElement;
  private citySelect: HTMLSelectElement;
  private streetSelect: HTMLSelectElement;
  private houseNumberInput: HTMLInputElement;
  private paymentMethodInputs: NodeListOf<HTMLInputElement>;
  private registerBtn: HTMLButtonElement;
  private formError: HTMLElement;
  
  private fieldValidations = {
    login: false,
    password: false,
    confirmPassword: false,
    city: false,
    street: false,
    houseNumber: false,
    paymentMethod: false
  };

  constructor() {
    this.form = document.getElementById('register-form') as HTMLFormElement;
    this.loginInput = document.getElementById('login') as HTMLInputElement;
    this.passwordInput = document.getElementById('password') as HTMLInputElement;
    this.confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;
    this.citySelect = document.getElementById('city') as HTMLSelectElement;
    this.streetSelect = document.getElementById('street') as HTMLSelectElement;
    this.houseNumberInput = document.getElementById('houseNumber') as HTMLInputElement;
    this.paymentMethodInputs = document.querySelectorAll('input[name="paymentMethod"]') as NodeListOf<HTMLInputElement>;
    this.registerBtn = document.getElementById('register-btn') as HTMLButtonElement;
    this.formError = document.getElementById('form-error') as HTMLElement;

    this.initializeEventListeners();
    this.setupCityStreetLogic();
  }

  private initializeEventListeners(): void {
    this.loginInput.addEventListener('blur', () => this.validateLogin());
    this.loginInput.addEventListener('focus', () => this.clearFieldError('login'));
    this.loginInput.addEventListener('input', () => this.validateLogin());

    this.passwordInput.addEventListener('blur', () => this.validatePassword());
    this.passwordInput.addEventListener('focus', () => this.clearFieldError('password'));
    this.passwordInput.addEventListener('input', () => this.validatePassword());

    this.confirmPasswordInput.addEventListener('blur', () => this.validateConfirmPassword());
    this.confirmPasswordInput.addEventListener('focus', () => this.clearFieldError('confirmPassword'));
    this.confirmPasswordInput.addEventListener('input', () => this.validateConfirmPassword());

    this.citySelect.addEventListener('change', () => this.validateCity());
    this.citySelect.addEventListener('blur', () => this.validateCity());
    this.citySelect.addEventListener('focus', () => this.clearFieldError('city'));

    this.streetSelect.addEventListener('change', () => this.validateStreet());
    this.streetSelect.addEventListener('blur', () => this.validateStreet());
    this.streetSelect.addEventListener('focus', () => this.clearFieldError('street'));

    this.houseNumberInput.addEventListener('blur', () => this.validateHouseNumber());
    this.houseNumberInput.addEventListener('focus', () => this.clearFieldError('houseNumber'));
    this.houseNumberInput.addEventListener('input', () => this.validateHouseNumber());

    this.paymentMethodInputs.forEach(input => {
      input.addEventListener('change', () => this.validatePaymentMethod());
    });

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  private setupCityStreetLogic(): void {
    this.citySelect.addEventListener('change', () => {
      const selectedCity = this.citySelect.value;
      
      this.streetSelect.innerHTML = '<option value="">Select a street</option>';
      
      if (selectedCity && STREET_DATA[selectedCity as keyof typeof STREET_DATA]) {
        this.streetSelect.disabled = false;
        const streets = STREET_DATA[selectedCity as keyof typeof STREET_DATA];
        
        streets.forEach(street => {
          const option = document.createElement('option');
          option.value = street;
          option.textContent = street;
          this.streetSelect.appendChild(option);
        });
      } else {
        this.streetSelect.disabled = true;
        this.fieldValidations.street = false;
        this.updateButtonState();
      }
    });
  }

  private validateLogin(): void {
    const login = this.loginInput.value.trim();
    const result = ValidationUtils.validateLogin(login);
    
    this.fieldValidations.login = result.isValid;
    this.updateFieldState('login', result);
    this.updateButtonState();
  }

  private validatePassword(): void {
    const password = this.passwordInput.value;
    const result = ValidationUtils.validatePassword(password);
    
    this.fieldValidations.password = result.isValid;
    this.updateFieldState('password', result);
    
    if (this.confirmPasswordInput.value) {
      this.validateConfirmPassword();
    }
    
    this.updateButtonState();
  }

  private validateConfirmPassword(): void {
    const password = this.passwordInput.value;
    const confirmPassword = this.confirmPasswordInput.value;
    const result = ValidationUtils.validatePasswordMatch(password, confirmPassword);
    
    this.fieldValidations.confirmPassword = result.isValid;
    this.updateFieldState('confirmPassword', result);
    this.updateButtonState();
  }

  private validateCity(): void {
    const city = this.citySelect.value;
    const result = ValidationUtils.validateRequired(city, 'City');
    
    this.fieldValidations.city = result.isValid;
    this.updateFieldState('city', result);
    this.updateButtonState();
  }

  private validateStreet(): void {
    const street = this.streetSelect.value;
    const result = ValidationUtils.validateRequired(street, 'Street');
    
    this.fieldValidations.street = result.isValid;
    this.updateFieldState('street', result);
    this.updateButtonState();
  }

  private validateHouseNumber(): void {
    const houseNumber = parseInt(this.houseNumberInput.value);
    const result = ValidationUtils.validateHouseNumber(houseNumber);
    
    this.fieldValidations.houseNumber = result.isValid;
    this.updateFieldState('houseNumber', result);
    this.updateButtonState();
  }

  private validatePaymentMethod(): void {
    const selectedPaymentMethod = Array.from(this.paymentMethodInputs).find(input => input.checked);
    const result = ValidationUtils.validateRequired(selectedPaymentMethod?.value || '', 'Payment method');
    
    this.fieldValidations.paymentMethod = result.isValid;
    this.updateFieldState('paymentMethod', result);
    this.updateButtonState();
  }

  private updateFieldState(fieldName: string, result: { isValid: boolean; message: string }): void {
    const input = document.getElementById(fieldName) as HTMLInputElement | HTMLSelectElement;
    const errorElement = document.getElementById(`${fieldName}-error`) as HTMLElement;
    const errorIcon = input.parentElement?.querySelector('.error-icon') as HTMLElement;

    if (result.isValid) {
      input.classList.remove('error');
      input.classList.add('success');
      errorElement.textContent = '';
      if (errorIcon) errorIcon.style.display = 'none';
    } else {
      input.classList.remove('success');
      input.classList.add('error');
      errorElement.textContent = result.message;
      if (errorIcon) errorIcon.style.display = 'block';
    }
  }

  private clearFieldError(fieldName: string): void {
    const input = document.getElementById(fieldName) as HTMLInputElement | HTMLSelectElement;
    const errorElement = document.getElementById(`${fieldName}-error`) as HTMLElement;
    const errorIcon = input.parentElement?.querySelector('.error-icon') as HTMLElement;

    input.classList.remove('error', 'success');
    errorElement.textContent = '';
    if (errorIcon) errorIcon.style.display = 'none';
  }

  private updateButtonState(): void {
    const allFieldsValid = Object.values(this.fieldValidations).every(valid => valid);
    this.registerBtn.disabled = !allFieldsValid;
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();
    
    const allFieldsValid = Object.values(this.fieldValidations).every(valid => valid);
    if (!allFieldsValid) {
      return;
    }

    this.setLoadingState(true);
    this.hideFormError();

    try {
      const selectedPaymentMethod = Array.from(this.paymentMethodInputs).find(input => input.checked);
      
      const userData = {
        login: this.loginInput.value.trim(),
        password: this.passwordInput.value,
        confirmPassword: this.confirmPasswordInput.value,
        city: this.citySelect.value,
        street: this.streetSelect.value,
        houseNumber: parseInt(this.houseNumberInput.value),
        paymentMethod: selectedPaymentMethod?.value || ''
      };

      const response = await AuthApi.register(userData);
      
      window.location.href = '/signin.html';
      
    } catch (error) {
      this.handleError(error);
    } finally {
      this.setLoadingState(false);
    }
  }

  private handleError(error: unknown): void {
    let errorMessage = 'Registration failed. Please try again.';
    
    if (error instanceof ApiError) {
      errorMessage = error.message || errorMessage;
    }
    
    this.showFormError(errorMessage);
  }

  private showFormError(message: string): void {
    this.formError.textContent = message;
    this.formError.style.display = 'block';
  }

  private hideFormError(): void {
    this.formError.style.display = 'none';
  }

  private setLoadingState(loading: boolean): void {
    this.registerBtn.disabled = loading;
    
    if (loading) {
      this.registerBtn.classList.add('loading');
    } else {
      this.registerBtn.classList.remove('loading');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new RegisterPage();
});