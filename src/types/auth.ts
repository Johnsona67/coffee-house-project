export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  login: string;
  password: string;
  confirmPassword: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: string;
}

export interface User {
  id: number;
  login: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: string;
  createdAt: string;
}

export interface LoginResponse {
  data: {
    access_token: string;
    user: User;
  };
  message: string;
}

export interface RegisterResponse {
  data: {};
  message: string;
  error?: string;
}

export interface ProfileResponse {
  data: User;
  message: string;
  error?: string;
}

export interface AuthError {
  error: string;
}
