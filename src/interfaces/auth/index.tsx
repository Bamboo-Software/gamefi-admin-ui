export interface RegisterResponse {
    message: string;
    token: string;
    success: boolean
}

export interface LoginResponse {
    message: string;
    token: string;
    success: boolean
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    timezone: string;
    ref?: string;
  }

  export interface LoginRequest {
    email: string;
    password: string;
  }

  export interface User {
    first_name: string;
    last_name: string;
  }
  
  export interface UserResponse {
    user: User;
    token: string;
  }
  
  export interface LoginRequest {
    username: string;
    password: string;
  }