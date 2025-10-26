import { AuthApi } from '../api/auth';
import { ValidationUtils } from '../utils/validation';
import { ApiError } from '../api/client';

class SignInPage {
  private form: HTMLFormElement;
  private loginInput: HTMLInputElement;
  private passwordInput: HTMLInputElement;
  private signInBtn: HTMLButtonElement;
  private formError: HTMLElement;
  
  private loginValid = false;
  private passwordValid = false;

  constructor() {
    this.form = document.getElementById('signin-form') as HTMLFormElement;
    this.loginInput = document.getElementById('login') as HTMLInputElement;
    this.passwordInput = document.getElementById('password') as HTMLInputElement;
    this.signInBtn = document.getElementById('signin-btn') as HTMLButtonElement;
    this.formError = document.getElementById('form-error') as HTMLElement;

    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    this.loginInput.addEventListener('blur', () => this.validateLogin());
    this.loginInput.addEventListener('focus', () => this.clearFieldError('login'));
    this.loginInput.addEventListener('input', () => this.validateLogin());

    this.passwordInput.addEventListener('blur', () => this.validatePassword());
    this.passwordInput.addEventListener('focus', () => this.clearFieldError('password'));
    this.passwordInput.addEventListener('input', () => this.validatePassword());

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  private validateLogin(): void {
    const login = this.loginInput.value.trim();
    const result = ValidationUtils.validateLogin(login);
    
    this.loginValid = result.isValid;
    this.updateFieldState('login', result);
    this.updateButtonState();
  }

  private validatePassword(): void {
    const password = this.passwordInput.value;
    const result = ValidationUtils.validatePassword(password);
    
    this.passwordValid = result.isValid;
    this.updateFieldState('password', result);
    this.updateButtonState();
  }

  private updateFieldState(fieldName: string, result: { isValid: boolean; message: string }): void {
    const input = document.getElementById(fieldName) as HTMLInputElement;
    const errorElement = document.getElementById(`${fieldName}-error`) as HTMLElement;
    const errorIcon = input.parentElement?.querySelector('.error-icon') as HTMLElement;

    if (result.isValid) {
      input.classList.remove('error');
      input.classList.add('success');
      errorElement.textContent = '';
      errorIcon.style.display = 'none';
    } else {
      input.classList.remove('success');
      input.classList.add('error');
      errorElement.textContent = result.message;
      errorIcon.style.display = 'block';
    }
  }

  private clearFieldError(fieldName: string): void {
    const input = document.getElementById(fieldName) as HTMLInputElement;
    const errorElement = document.getElementById(`${fieldName}-error`) as HTMLElement;
    const errorIcon = input.parentElement?.querySelector('.error-icon') as HTMLElement;

    input.classList.remove('error', 'success');
    errorElement.textContent = '';
    errorIcon.style.display = 'none';
  }

  private updateButtonState(): void {
    this.signInBtn.disabled = !(this.loginValid && this.passwordValid);
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();
    
    if (!this.loginValid || !this.passwordValid) {
      return;
    }

    this.setLoadingState(true);
    this.hideFormError();

    try {
      const credentials = {
        login: this.loginInput.value.trim(),
        password: this.passwordInput.value
      };

      const response = await AuthApi.login(credentials);
      
      AuthApi.saveToken(response.data.access_token);
      
      window.location.href = '/menu.html';
      
    } catch (error) {
      this.handleError(error);
    } finally {
      this.setLoadingState(false);
    }
  }

  private handleError(error: unknown): void {
    let errorMessage = 'Incorrect login or password';
    
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
    this.signInBtn.disabled = loading;
    
    if (loading) {
      this.signInBtn.classList.add('loading');
    } else {
      this.signInBtn.classList.remove('loading');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SignInPage();
});