import { requestJson, ApiError } from './client';
import type { 
  LoginRequest, 
  RegisterRequest, 
  LoginResponse, 
  RegisterResponse, 
  ProfileResponse,
  AuthError 
} from '../types/auth';

const API_BASE_URL = 'https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com';

export class AuthApi {
  private static getAuthHeaders(token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await requestJson<LoginResponse>(
        `${API_BASE_URL}/auth/login`,
        {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify(credentials)
        }
      );
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        // Parse error response for better error messages
        try {
          const errorData = error.body as AuthError;
          throw new ApiError(errorData.error || 'Login failed', error.status, error.body);
        } catch {
          throw new ApiError('Incorrect login or password', error.status, error.body);
        }
      }
      throw error;
    }
  }

  static async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await requestJson<RegisterResponse>(
        `${API_BASE_URL}/auth/register`,
        {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify(userData)
        }
      );
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        // Parse error response for better error messages
        try {
          const errorData = error.body as AuthError;
          throw new ApiError(errorData.error || 'Registration failed', error.status, error.body);
        } catch {
          throw new ApiError('Registration failed', error.status, error.body);
        }
      }
      throw error;
    }
  }

  static async getProfile(token: string): Promise<ProfileResponse> {
    try {
      const response = await requestJson<ProfileResponse>(
        `${API_BASE_URL}/auth/profile`,
        {
          method: 'GET',
          headers: this.getAuthHeaders(token)
        }
      );
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new ApiError('Failed to get profile', error.status, error.body);
      }
      throw error;
    }
  }

  static saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  static getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  static removeToken(): void {
    localStorage.removeItem('access_token');
  }

  static isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
